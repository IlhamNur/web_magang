import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMahasiswaDto } from '../mahasiswa/dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from '../mahasiswa/dto/update-mahasiswa.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class MahasiswaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAll(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    
    if (!ability.can('read', 'Mahasiswa')) {
      // console.log(payload);
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data mahasiswa');
    }

    const mahasiswas =  await this.prisma.mahasiswa.findMany({
      where: {
        AND: [accessibleBy(ability).Mahasiswa],
        nim: {
          contains: params.nim,
          mode: 'insensitive',
        },
        nama: {
          contains: params.nama,
          mode: 'insensitive',
        },
        kelas: {
          contains: params.kelas,
          mode: 'insensitive',
        },
        prodi: {
          contains: params.prodi,
          mode: 'insensitive',
        },
        dosenPembimbingMagang: {
          dosenId: params.dosenId || undefined,
        },
        pembimbingLapangan: {
          pemlapId: parseInt(params.pemlapId) || undefined,
        },
        satker: {
          satkerId: parseInt(params.satkerId) || undefined,
        },
        user: {
          email: {
            contains: params.email,
            mode: 'insensitive',
          },
          tahunAjaran: {
            tahun: {
              contains: params.tahunAjaran,
            },
          },
        },
      },
      select: {
        mahasiswaId: true,
        nim: true,
        nama: true,
        kelas: true,
        prodi: true,
        alamat: true,
        dosenPembimbingMagang: {
          select: {
            dosenId: true,
            nama: true,
          },
        },
        pembimbingLapangan: {
          select: {
            pemlapId: true,
            nama: true,
          },
        },
        satker: {
          select: {
            satkerId: true,
            nama: true,
          },
        },
        user: {
          select: {
            userId: true,
            email: true,
            tahunAjaran: {
              select: {
                tahun: true,
              },
            },
          },
        },
      },
      orderBy: {
        nim: 'asc',
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    let responseMahasiswa = [];

    for (let i = 0; i < mahasiswas.length; i++) {
      responseMahasiswa.push({
        mahasiswaId: mahasiswas[i].mahasiswaId || null,
        userId: mahasiswas[i].user.userId || null,
        nim: mahasiswas[i].nim || null,
        nama: mahasiswas[i].nama || null,
        kelas: mahasiswas[i].kelas || null,
        prodi: mahasiswas[i].prodi || null,
        alamat: mahasiswas[i].alamat || null,
        dosenId: mahasiswas[i].dosenPembimbingMagang ? mahasiswas[i].dosenPembimbingMagang.dosenId : null,
        namaDosenPembimbingMagang: mahasiswas[i].dosenPembimbingMagang ? mahasiswas[i].dosenPembimbingMagang.nama : null,
        pemlapId: mahasiswas[i].pembimbingLapangan ? mahasiswas[i].pembimbingLapangan.pemlapId : null,
        namaPembimbingLapangan: mahasiswas[i].pembimbingLapangan ? mahasiswas[i].pembimbingLapangan.nama : null,
        satkerId: mahasiswas[i].satker ? mahasiswas[i].satker.satkerId : null,
        namaSatker: mahasiswas[i].satker ? mahasiswas[i].satker.nama : null,
        email: mahasiswas[i].user.email || null,
        tahunAjaran: mahasiswas[i].user.tahunAjaran.tahun || null,
      });
    }

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Ditemukan',
      data: responseMahasiswa,
    };
  }

  async importExcel(
    data: any
  ) {
    try {
      const injectedToken = this.request.headers['authorization'].split(' ')[1];
      const payload = this.jwtService.decode(injectedToken);
      const ability = this.caslAbilityFactory.createForUser(payload);
  
      if (!ability.can('create', 'Mahasiswa')) {
        throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan data mahasiswa');
      }
  
      let createMahasiswaDto: CreateMahasiswaDto[] = [];
      let mahasiswa = []
  
      const tahunAjaranAktif = await this.prisma.tahunAjaran.findFirst({
        where: {
          isActive: true,
        }
      });
  
      for (let i = 0; i < data.length; i++) {
        createMahasiswaDto.push({
          nim: data[i].nim.toString(),
          nama: data[i].nama.toString(),
          prodi: data[i].prodi.toString(),
          kelas: data[i].kelas.toString(),
          alamat: data[i].alamat.toString(),
          user: {
            create: {
              email: data[i].email.toString(),
              password: bcrypt.hashSync(data[i].password.toString(), 10),
              tahunAjaran: {
                connect: {
                  tahunAjaranId: tahunAjaranAktif.tahunAjaranId,
                },
              },
              userRoles: {
                create: {
                  roleId: 9,
                },
              },
            }
          }
        })
  
        mahasiswa.push(
          await this.prisma.mahasiswa.create({
            data: createMahasiswaDto[i],
            select: {
              mahasiswaId: true,
              nim: true,
              nama: true,
              prodi: true,
              kelas: true,
              alamat: true,
              user: {
                select: {
                  email: true,
                  tahunAjaran: {
                    select: {
                      tahun: true,
                    },
                  },
                },
              },
            }
          })
        );
      }

      // const mahasiswas = await this.prisma.mahasiswa.createMany({
      //   data: createMahasiswaDto
      // });
  
      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Ditambahkan',
        data: mahasiswa,
      };
    } catch (error) {
      await this.prisma.$disconnect();
      throw new BadRequestException('Data yang anda masukkan tidak valid');
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async update(
    mahasiswaId: number,
    updateMahasiswaDto: UpdateMahasiswaDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Mahasiswa')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data mahasiswa');
    }

    await this.prisma.mahasiswa.findFirstOrThrow({
      where: {
        mahasiswaId: mahasiswaId,
        AND: [accessibleBy(ability).Mahasiswa],
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data mahasiswa');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    // cek dilakukan karna 3 field ini bersifat foreign key dan hanya bisa menerima perintah connect atau disconnect
    const cekDosenPembimbingMagang =
      (updateMahasiswaDto.dosenPembimbingMagang.dosenId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            dosenId: updateMahasiswaDto.dosenPembimbingMagang.dosenId
          }
        };

    const cekPembimbingLapangan =
      (updateMahasiswaDto.pembimbingLapangan.pemlapId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            pemlapId: updateMahasiswaDto.pembimbingLapangan.pemlapId
          }
        };

    const cekSatker =
      (updateMahasiswaDto.satker.satkerId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            satkerId: updateMahasiswaDto.satker.satkerId
          }
        };

    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: mahasiswaId,
      },
      data: {
        nim: updateMahasiswaDto.nim || undefined,
        nama: updateMahasiswaDto.nama || undefined,
        kelas: updateMahasiswaDto.kelas || undefined,
        prodi: updateMahasiswaDto.prodi || undefined,
        alamat: updateMahasiswaDto.alamat || undefined,
        dosenPembimbingMagang: {
          ...cekDosenPembimbingMagang,
        },
        pembimbingLapangan: {
          ...cekPembimbingLapangan,
        },
        satker: {
          ...cekSatker,
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const updatedMahasiswa = await this.prisma.mahasiswa.findUnique({
      where: {
        mahasiswaId: mahasiswaId,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diupdate',
      data: updatedMahasiswa,
    };
  }

  async setTempatMagangBatch(
    data: any
  ) {
    try {
      const injectedToken = this.request.headers['authorization'].split(' ')[1];
      const payload = this.jwtService.decode(injectedToken);
      const ability = this.caslAbilityFactory.createForUser(payload);
  
      if (!ability.can('update', 'Mahasiswa')) {
        throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data mahasiswa');
      }
  
      let mahasiswa = []
  
      for (let i = 0; i < data.length; i++) {
        const mahasiswaId = data[i].mahasiswaId;
        const satkerId = data[i].satkerId;
  
        const cekSatker =
          (satkerId.toString() === '') ?
            {
              disconnect: true,
            } :
            {
              connect: {
                satkerId: satkerId
              }
            };
  
        await this.prisma.mahasiswa.update({
          where: {
            mahasiswaId: mahasiswaId,
          },
          data: {
            satker: {
              ...cekSatker,
            },
          },
        })
  
        mahasiswa.push(
          await this.prisma.mahasiswa.findUnique({
            where: {
              mahasiswaId: mahasiswaId,
            },
          })
        )
      }

      this.prisma.$disconnect();
      // const mahasiswas = await this.prisma.mahasiswa.updateMany({
      //   where: {
      //     mahasiswaId: {
      //       in: data.map((item) => item.mahasiswaId),
      //     },
      //   },
      //   data: {
      //     satkerId: {
      //       set: data.map((item) => item.satkerId),
      //     },
      //   },
      // }).finally(() => {
      //   this.prisma.$disconnect();
      // });
  
      return {
        status: 'success',
        message: 'Data Mahasiswa Berhasil Diupdate',
        data: mahasiswa,
      };
    } catch (error) {
      throw new BadRequestException('Data yang anda masukkan tidak valid');
    }
  }
}
