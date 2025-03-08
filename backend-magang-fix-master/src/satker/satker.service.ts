import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateSatkerDto } from '../satker/dto/satker/create-satker.dto';
import { UpdateSatkerDto } from '../satker/dto/satker/update-satker.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateSatkerBulkDto } from './dto/satker/create-satkerBulk.dto';
import { UpdateKapasitasSatkerTahunAjaranDto } from '../satker/dto/kapasitas-satker-tahun-ajaran/update-kapasitasSatkerTahunAjaran.dto';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class SatkerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAllSatkerBy(params: {
    satkerId: number;
    kodeSatker: string;
    namaProvinsi: string;
    kodeProvinsi: string;
    namaKabupatenKota: string;
    kodeKabupatenKota: string;
    alamat: string;
    internalBPS: string;
  }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat satker');
    }

    let internal: boolean;
    
    if (params.internalBPS !== undefined) {
      internal = params.internalBPS === 'true' || params.internalBPS === '1' ? true : false;
    }

    const daftarSatker = await this.prisma.satker.findMany({
      where: {
        AND: [accessibleBy(ability).Satker],
        satkerId: parseInt(params.satkerId.toString()) || undefined,
        kodeSatker: {
          contains: params.kodeSatker || undefined,
          mode: 'insensitive',
        },
        provinsi: {
          nama: {
            contains: params.namaProvinsi || undefined,
          },
          kodeProvinsi: {
            contains: params.kodeProvinsi || undefined,
          },
        },
        kabupatenKota: {
          nama: {
            contains: params.namaKabupatenKota || undefined,
          },
          kodeKabupatenKota: {
            contains: params.kodeKabupatenKota || undefined,
          },
        },
        alamat: {
          contains: params.alamat || undefined,
        },
        internalBPS: internal || undefined,
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        latitude: true,
        longitude: true,
        kabupatenKota: {
          select: {
            nama: true,
            kodeKabupatenKota: true,
            kabupatenKotaId: true,
            provinsi: {
              select: {
                nama: true,
                kodeProvinsi: true,
                provinsiId: true,
              },
            },
          },
        },
        kodeSatker: true,
        kapasitasSatkerTahunAjaran: {
          select: {
            kapasitas: true,
            tahunAjaran: {
              select: {
                tahun: true,
              },
            },
          },
        },
        provinsi: {
          select: {
            nama: true,
            kodeProvinsi: true,
            provinsiId: true,
            adminProvinsi: {
              select: {
                adminProvinsiId: true,
                nama: true,
              },
            },
          },
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    let daftarSatkerResponse = [];

    daftarSatker.forEach((satker) => {
      daftarSatkerResponse.push({
        satkerId: satker.satkerId,
        nama: satker.nama,
        kodeSatker: satker.kodeSatker,
        email: satker.email,
        alamat: satker.alamat,
        latitude: satker.latitude,
        longitude: satker.longitude,
        kabupatenKotaId: satker.kabupatenKota.kabupatenKotaId,
        kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
        namaKabupatenKota: satker.kabupatenKota.nama,
        provinsiId: satker.kabupatenKota.provinsi.provinsiId,
        kodeProvinsi: satker.kabupatenKota.provinsi.kodeProvinsi,
        namaProvinsi: satker.kabupatenKota.provinsi.nama,
        kapasitas: satker.kapasitasSatkerTahunAjaran,
      });
    });

    // for (let i = 0; i < daftarSatker.length; i++) {
    //   daftarSatkerResponse.push({
    //     satkerId: daftarSatker[i].satkerId,
    //     nama: daftarSatker[i].nama,
    //     kodeSatker: daftarSatker[i].kodeSatker,
    //     email: daftarSatker[i].email,
    //     alamat: daftarSatker[i].alamat,
    //     latitude: daftarSatker[i].latitude,
    //     longitude: daftarSatker[i].longitude,
    //     kabupatenKotaId: daftarSatker[i].kabupatenKota.kabupatenKotaId,
    //     kodeKabupatenKota: daftarSatker[i].kabupatenKota.kodeKabupatenKota,
    //     namaKabupatenKota: daftarSatker[i].kabupatenKota.nama,
    //     provinsiId: daftarSatker[i].kabupatenKota.provinsi.provinsiId,
    //     kodeProvinsi: daftarSatker[i].kabupatenKota.provinsi.kodeProvinsi,
    //     namaProvinsi: daftarSatker[i].kabupatenKota.provinsi.nama,
    //     kapasitas: daftarSatker[i].kapasitasSatkerTahunAjaran
    //   });
    // }

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: daftarSatkerResponse,
    }
  }

  async createBulk(
    data: any
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan satker');
    }

    let createSatkerDto: CreateSatkerBulkDto[] = [];
    let satker = [];

    for (let i = 0; i < data.length; i++) {
      createSatkerDto.push({
        nama: data[i].namaSatker.toString(),
        email: data[i].emailSatker.toString(),
        alamat: data[i].alamat.toString(),
        kodeSatker: data[i].kodeProvinsi.toString() + data[i].kodeKabupatenKota.toString(),
        provinsi: {
          connect: {
            kodeProvinsi: data[i].kodeProvinsi.toString(),
          }
        },
        kabupatenKota: {
          create: {
            nama: data[i].namaKabupatenKota.toString(),
            kodeKabupatenKota: data[i].kodeKabupatenKota.toString(),
            provinsi: {
              connect: {
                kodeProvinsi: data[i].kodeProvinsi.toString(),
              }
            }
          }
        },
        internalBPS: data[i].internalBPS.toString() === '1' ? true : false,
        kapasitasSatkerTahunAjaran: {
          create: {
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                })).tahunAjaranId,
              },
            },
          },
        },
      });

      satker.push(
        await this.prisma.satker.create({
          data: createSatkerDto[i],
          select: {
            satkerId: true,
            nama: true,
            alamat: true,
            email: true,
            kabupatenKota: {
              select: {
                nama: true,
                provinsi: {
                  select: {
                    nama: true,
                  },
                },
              },
            },
            kodeSatker: true,
            kapasitasSatkerTahunAjaran: {
              select: {
                kapasitas: true,
                tahunAjaran: {
                  select: {
                    tahun: true,
                  },
                },
              },
            },
          },
        })
      );
    }

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: data
    }
  }

  async create(satker: CreateSatkerDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan satker');
    }

    let satkerBaru;

    satkerBaru = await this.prisma.satker.create({
      data: {
        nama: satker.nama,
        email: satker.email,
        alamat: satker.alamat,
        kodeSatker: satker.provinsi.kodeProvinsi + satker.kabupatenKota.kodeKabupatenKota,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi,
          },
        },
        kabupatenKota: {
          create: {
            nama: satker.kabupatenKota.namaKabupatenKota,
            kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
            provinsi: {
              connect: {
                kodeProvinsi: satker.provinsi.kodeProvinsi,
              },
            },
          }
        },
        internalBPS: satker.internalBPS,
        kapasitasSatkerTahunAjaran: {
          create: {
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                }).finally(() => {
                  this.prisma.$disconnect();
                })).tahunAjaranId,
              },
            },
          },
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: satkerBaru,
    }
  }

  async findAllKapasitasSatkerBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat kapasitas satker');
    }

    const kapasitasSatker = await this.prisma.kapasitasSatkerTahunAjaran.findMany({
      where: {
        AND: [accessibleBy(ability).KapasitasSatkerTahunAjaran],
        satker: {
          kodeSatker: {
            contains: params.kodeSatker,
          },
          provinsi: {
            nama: {
              contains: params.namaProvinsi,
            },
            kodeProvinsi: {
              contains: params.kodeProvinsi,
            },
          },
          kabupatenKota: {
            nama: {
              contains: params.namaKabupatenKota,
            },
            kodeKabupatenKota: {
              contains: params.kodeKabupatenKota,
            },
          },
        },
        tahunAjaran: {
          tahun: {
            contains: params.tahunAjaran,
          },
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Kapasitas Satuan Kerja Berhasil Diambil',
      data: kapasitasSatker,
    }
  }

  async update(satkerId: number, satker: UpdateSatkerDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate satker');
    }

    await this.prisma.satker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Satker],
        satkerId: parseInt(satkerId.toString()),
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate satker ini');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const checkKapasitasSatkerTahunAjaranAktif = await this.prisma.kapasitasSatkerTahunAjaran.findFirst({
      where: {
        satkerId: parseInt(satkerId.toString()),
        tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
          where: {
            isActive: true,
          },
          select: {
            tahunAjaranId: true,
          },
        }).finally(() => {
          this.prisma.$disconnect();
        })).tahunAjaranId,
      },
      select: {
        kapasitasId: true,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    if (checkKapasitasSatkerTahunAjaranAktif === null) {
      // create kapasitas baru
      const createKapasitas = await this.prisma.kapasitasSatkerTahunAjaran.create({
        data: {
          kapasitas: satker.kapasitasSatkerTahunAjaran.kapasitas,
          tahunAjaran: {
            connect: {
              tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                where: {
                  isActive: true,
                },
                select: {
                  tahunAjaranId: true,
                },
              }).finally(() => {
                this.prisma.$disconnect();
              })).tahunAjaranId,
            },
          },
          satker: {
            connect: {
              satkerId: parseInt(satkerId.toString()),
            },
          },
        },
        select: {
          kapasitasId: true,
        },
      }).finally(() => {
        this.prisma.$disconnect();
      });
    }

    const updateSatker = await this.prisma.satker.update({
      where: {
        satkerId: parseInt(satkerId.toString()),
      },
      data: {
        nama: satker.nama,
        alamat: satker.alamat,
        email: satker.email,
        latitude: satker.latitude || undefined,
        longitude: satker.longitude || undefined,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi,
          },
        },
        kabupatenKota: {
          connect: {
            kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
          },
        },
        kapasitasSatkerTahunAjaran: {
          update: {
            data: {
              kapasitas: satker.kapasitasSatkerTahunAjaran.kapasitas,
            },
            where: {
              kapasitasId: (await this.prisma.kapasitasSatkerTahunAjaran.findFirst({
                where: {
                  satkerId: parseInt(satkerId.toString()),
                  tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                    where: {
                      isActive: true,
                    },
                    select: {
                      tahunAjaranId: true,
                    },
                  }).finally(() => {
                    this.prisma.$disconnect();
                  })).tahunAjaranId,
                },
                select: {
                  kapasitasId: true,
                },
              }).finally(() => {
                this.prisma.$disconnect();
              })).kapasitasId
            },
          },
        },
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kodeSatker: true,
        kapasitasSatkerTahunAjaran: {
          select: {
            kapasitas: true,
            tahunAjaran: {
              select: {
                tahun: true,
              },
            },
          },
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diubah',
      data: updateSatker,
    }
  }

  async updateDataLatLongSatker(satkerId: number, satker: UpdateSatkerDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate satker');
    }

    await this.prisma.satker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Satker],
        satkerId: parseInt(satkerId.toString()),
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate satker ini');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const updateSatker = await this.prisma.satker.update({
      where: {
        satkerId: parseInt(satkerId.toString()),
      },
      data: {
        latitude: satker.latitude,
        longitude: satker.longitude,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diubah',
      data: updateSatker,
    }
  }

  async updateKapasitasSatker(kapasitasSatkerId: number, kapasitasSatker: UpdateKapasitasSatkerTahunAjaranDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'KapasitasSatkerTahunAjaran')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate kapasitas satker');
    }

    await this.prisma.kapasitasSatkerTahunAjaran.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).KapasitasSatkerTahunAjaran],
        kapasitasId: parseInt(kapasitasSatkerId.toString()),
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate kapasitas satker ini');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const updateKapasitas = await this.prisma.kapasitasSatkerTahunAjaran.update({
      where: {
        kapasitasId: parseInt(kapasitasSatkerId.toString()),
      },
      data: {
        kapasitas: kapasitasSatker.kapasitas,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Kapasitas Satuan Kerja Berhasil Diubah',
      data: updateKapasitas,
    }
  }

  async remove(satkerId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'Satker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus satker');
    }

    await this.prisma.kapasitasSatkerTahunAjaran.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).KapasitasSatkerTahunAjaran],
        kapasitasId: parseInt(satkerId.toString()),
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus satker ini');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const deleteSatker = await this.prisma.satker.delete({
      where: {
        satkerId: satkerId,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Dihapus',
      data: deleteSatker,
    }
  }
}
