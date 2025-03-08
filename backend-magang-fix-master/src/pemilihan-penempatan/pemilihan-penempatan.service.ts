import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Satker } from '../satker/dto/satker/satker.entity';
import { PrismaService } from '../prisma/prisma.service';
import { parse } from 'path';

@Injectable()
export class PemilihanPenempatanService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAllPemilihanPenempatanBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data pemilihan penempatan');
    }

    const data = await this.prisma.pilihanSatker.findMany({
      where: {
        satkerId: params.satkerId || undefined,
        mahasiswaId: params.mahasiswaId || undefined,
        AND: [accessibleBy(ability).PilihanSatker],
      },
      select: {
        pilihanSatkerId: true,
        status: true,
        prioritas: true,
        isActive: true,
        satker: {
          select: {
            nama: true,
            satkerId: true,
            provinsi: {
              select: {
                provinsiId: true,
                nama: true,
              }
            }
          },
        },
        mahasiswa: {
          select: {
            nama: true,
            nim: true,
            mahasiswaId: true,
            alamat: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    let pilihanSatkerResponse = [];

    data.forEach((pilihanSatker) => {
      pilihanSatkerResponse.push({
        pilihanSatkerId: pilihanSatker.pilihanSatkerId,
        mahasiswaId: pilihanSatker.mahasiswa.mahasiswaId,
        satkerId: pilihanSatker.satker.satkerId,
        status: pilihanSatker.status,
        isActive: pilihanSatker.isActive,
        prioritas: pilihanSatker.prioritas,
        provinsiId: pilihanSatker.satker.provinsi.provinsiId,
        namaProvinsi: pilihanSatker.satker.provinsi.nama,
        namaSatker: pilihanSatker.satker.nama,
        namaMahasiswa: pilihanSatker.mahasiswa.nama,
        nim: pilihanSatker.mahasiswa.nim,
        alamat: pilihanSatker.mahasiswa.alamat,
        createdAt: pilihanSatker.createdAt,
        updatedAt: pilihanSatker.updatedAt,
      });
    });

    return {
      status: 'success',
      message: 'Data Pemilihan Penempatan Berhasil Diambil',
      data: pilihanSatkerResponse
    }
  }

  async confirmPemilihanPenempatan(pilihanId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const confirmPilihan = await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId,
      },
      data: {
        status: 'Diterima',
        isActive: false
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    // ubah status pilihan lainnya menjadi 'Ditolak'
    await this.prisma.pilihanSatker.updateMany({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId,
        NOT: {
          pilihanSatkerId: confirmPilihan.pilihanSatkerId
        },
      },
      data: {
        status: 'Diterima pada pilihan lain',
        isActive: false
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    // connect mahasiswa dengan satker pilihan
    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId
      },
      data: {
        satker: {
          connect: {
            satkerId: confirmPilihan.satkerId
          }
        }
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Status Pemilihan Penempatan Berhasil Diubah',
    }
  }

  async cancelConfirmPemilihanPenempatan(pilihanId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        status: 'Ditolak',
        isActive: false
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Status Pemilihan Penempatan Berhasil Diubah',
    }
  }

  async createPemilihanPenempatan(
    mahasiswaId: number,
    pilihan: Satker[]
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan pemilihan penempatan');
    }

    for (let i = 0; i < pilihan.length; i++) {
      await this.prisma.pilihanSatker.create({
        data: {
          mahasiswaId: mahasiswaId,
          satkerId: pilihan[i].satkerId,
          status: 'Menunggu',
          prioritas: i + 1,
          isActive: true
        }
      }).finally(() => {
        this.prisma.$disconnect();
      });
    }

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Ditambahkan',
    }
  }

  async pindahPemilihanPenempatan(
    pilihanId: number,
    pilihan: Satker
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah pemilihan penempatan');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihan.satkerId,
        status: 'Menunggu',
        isActive: true
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dipindahkan',
    }
  }

  async deletePemilihanPenempatan(pilihanId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus pemilihan penempatan');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    await this.prisma.pilihanSatker.delete({
      where: {
        pilihanSatkerId: pilihanId
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dihapus'
    }
  }

  async getPeriodePemilihanTempatMagang(
    params: {
      tahunAjaranId: number;
    }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'PeriodePemilihanTempatMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data periode pemilihan tempat magang');
    }

    const periode = await this.prisma.periodePemilihanTempatMagang.findMany({
      where: {
        AND: [accessibleBy(ability).PeriodePemilihanTempatMagang],
        tahunAjaranId: params.tahunAjaranId || undefined
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Periode Berhasil Diambil',
      data: periode
    }
  }

  async createPeriodePemilihanTempatMagang(data: {
    tanggalMulai: Date;
    tanggalAkhir: Date;
    tahunAjaranId: number;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'PeriodePemilihanTempatMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan periode pemilihan tempat magang');
    }

    const periodePemilihanTempatMagang = await this.prisma.periodePemilihanTempatMagang.create({
      data: {
        tanggalMulai: new Date(data.tanggalMulai),
        tanggalAkhir: new Date(data.tanggalAkhir),
        tahunAjaran: {
          connect: {
            tahunAjaranId: data.tahunAjaranId
          }
        }
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Ditambahkan',
      data: periodePemilihanTempatMagang
    }
  }

  async updatePeriodePemilihanTempatMagang(periodeId: number, data: {
    tanggalMulai: Date;
    tanggalAkhir: Date;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PeriodePemilihanTempatMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah periode pemilihan tempat magang');
    }

    await this.prisma.periodePemilihanTempatMagang.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PeriodePemilihanTempatMagang],
        periodePemilihanTempatMagangId: parseInt(periodeId.toString())
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah periode pemilihan tempat magang');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const periodePemilihanTempatMagang = await this.prisma.periodePemilihanTempatMagang.update({
      where: {
        periodePemilihanTempatMagangId: parseInt(periodeId.toString())
      },
      data: {
        tanggalMulai: new Date(data.tanggalMulai),
        tanggalAkhir: new Date(data.tanggalAkhir)
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Diubah',
      data: periodePemilihanTempatMagang
    }
  }

  async deletePeriodePemilihanTempatMagang(periodeId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'PeriodePemilihanTempatMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus periode pemilihan tempat magang');
    }

    await this.prisma.periodePemilihanTempatMagang.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PeriodePemilihanTempatMagang],
        periodePemilihanTempatMagangId: parseInt(periodeId.toString())
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus periode pemilihan tempat magang');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const periodePemilihanTempatMagang = await this.prisma.periodePemilihanTempatMagang.delete({
      where: {
        periodePemilihanTempatMagangId: parseInt(periodeId.toString())
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Dihapus',
      data: periodePemilihanTempatMagang
    }
  }

  async getPeriodeKonfirmasiPemilihanSatker(params: {
    tahunAjaranId: number;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'PeriodeKonfirmasiPemilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data periode konfirmasi pemilihan satker');
    }

    const periode = await this.prisma.periodeKonfirmasiPemilihanSatker.findMany({
      where: {
        AND: [accessibleBy(ability).PeriodeKonfirmasiPemilihanSatker],
        tahunAjaranId: params.tahunAjaranId || undefined
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Periode Berhasil Diambil',
      data: periode
    }
  }

  async createPeriodeKonfirmasiPemilihanSatker(data: {
    tanggalMulai: Date;
    tanggalAkhir: Date;
    tahunAjaranId: number;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'PeriodeKonfirmasiPemilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan periode konfirmasi pemilihan satker');
    }

    const periodeKonfirmasiPemilihanSatker = await this.prisma.periodeKonfirmasiPemilihanSatker.create({
      data: {
        tanggalMulai: new Date(data.tanggalMulai),
        tanggalAkhir: new Date(data.tanggalAkhir),
        tahunAjaran: {
          connect: {
            tahunAjaranId: data.tahunAjaranId
          }
        }
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Ditambahkan',
      data: periodeKonfirmasiPemilihanSatker
    }
  }

  async updatePeriodeKonfirmasiPemilihanSatker(periodeId: number, data: {
    tanggalMulai: Date;
    tanggalAkhir: Date;
    tahunAjaranId: number;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PeriodeKonfirmasiPemilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah periode konfirmasi pemilihan satker');
    }

    await this.prisma.periodeKonfirmasiPemilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PeriodeKonfirmasiPemilihanSatker],
        periodeKonfirmasiPemilihanSatkerId: parseInt(periodeId.toString())
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah periode konfirmasi pemilihan satker');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const periodeKonfirmasiPemilihanSatker = await this.prisma.periodeKonfirmasiPemilihanSatker.update({
      where: {
        periodeKonfirmasiPemilihanSatkerId: parseInt(periodeId.toString())
      },
      data: {
        tanggalMulai: new Date(data.tanggalMulai),
        tanggalAkhir: new Date(data.tanggalAkhir),
        tahunAjaran: {
          connect: {
            tahunAjaranId: data.tahunAjaranId
          }
        }
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Diubah',
      data: periodeKonfirmasiPemilihanSatker
    }
  }

  async deletePeriodeKonfirmasiPemilihanSatker(periodeId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'PeriodeKonfirmasiPemilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus periode konfirmasi pemilihan satker');
    }

    await this.prisma.periodeKonfirmasiPemilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PeriodeKonfirmasiPemilihanSatker],
        periodeKonfirmasiPemilihanSatkerId: parseInt(periodeId.toString())
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus periode konfirmasi pemilihan satker');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const periodeKonfirmasiPemilihanSatker = await this.prisma.periodeKonfirmasiPemilihanSatker.delete({
      where: {
        periodeKonfirmasiPemilihanSatkerId: parseInt(periodeId.toString())
      }
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Periode Berhasil Dihapus',
      data: periodeKonfirmasiPemilihanSatker
    }
  }
}
