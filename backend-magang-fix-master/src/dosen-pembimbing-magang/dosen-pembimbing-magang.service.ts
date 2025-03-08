import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDosenPembimbingMagangDto } from '../dosen-pembimbing-magang/dto/update-dosenPembimbingMagang.dto';
import { CreateDosenPembimbingMagangDto } from '../dosen-pembimbing-magang/dto/create-dosenPembimbingMagang.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class DosenPembimbingMagangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAllDosenBy(
    params: {
      nip: string,
      nama: string,
      prodi: string,
      email: string,
      tahunAjaran: string
    }
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data dosen pembimbing magang');
    }

    const data = await this.prisma.dosenPembimbingMagang.findMany({
      where: {
        AND: [
          accessibleBy(ability).DosenPembimbingMagang,
          {
            nip: {
              contains: params.nip,
              mode: 'insensitive',
            },
            nama: {
              contains: params.nama,
              mode: 'insensitive',
            },
            prodi: {
              contains: params.prodi,
              mode: 'insensitive',
            },
            user: {
              email: {
                contains: params.email,
                mode: 'insensitive',
              },
              tahunAjaran: {
                tahun: {
                  contains: params.tahunAjaran,
                  mode: 'insensitive',
                },
              }
            },
          }
        ]
      },
      select: {
        dosenId: true,
        nip: true,
        nama: true,
        prodi: true,
        user: {
          select: {
            userId: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    let dosenResponse = [];

    data.forEach((dosen) => {
      dosenResponse.push({
        dosenId: dosen.dosenId,
        userId: dosen.user.userId,
        nip: dosen.nip,
        nama: dosen.nama,
        prodi: dosen.prodi,
        email: dosen.user.email,
        createdAt: dosen.createdAt,
        updatedAt: dosen.updatedAt,
      });
    });

    return {
      status: 'success',
      message: 'Data Dosen Pembimbing Berhasil Diambil',
      data: data,
    };
  }

  async create(createDosenPembimbingMagang: CreateDosenPembimbingMagangDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data dosen pembimbing magang');
    }

    const hashedPassword = await bcrypt.hash(createDosenPembimbingMagang.user.password, 10);

    const dosenBaru = await this.prisma.dosenPembimbingMagang.create({
      data: {
        nip: createDosenPembimbingMagang.nip,
        nama: createDosenPembimbingMagang.nama,
        prodi: createDosenPembimbingMagang.prodi,
        user: {
          create: {
            email: createDosenPembimbingMagang.user.email,
            password: hashedPassword,
            tahunAjaran: {
              connect: {
                tahun: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahun: true,
                  },
                })).tahun,
              }
            },
            userRoles: {
              create: {
                roleId: 3,
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
      message: 'Data Dosen Pembimbing Berhasil Ditambahkan',
      data: dosenBaru,
    };
  }

  async update(dosenId: number, updateDosenPembimbingMagang: UpdateDosenPembimbingMagangDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data dosen pembimbing magang');
    }

    await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
      where: {
        dosenId: dosenId,
        AND: [accessibleBy(ability).DosenPembimbingMagang],
      }
    }).catch(() => {
      throw new ForbiddenException('Dosen Pembimbing Magang tidak ditemukan');
    }).finally(() => {
      this.prisma.$disconnect();
    });

    const updatedDosen = await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        nip: updateDosenPembimbingMagang.nip || undefined,
        nama: updateDosenPembimbingMagang.nama || undefined,
        prodi: updateDosenPembimbingMagang.prodi || undefined,
        user: {
          update: {
            email: updateDosenPembimbingMagang.user.email || undefined,
            password: updateDosenPembimbingMagang.user.password ? await bcrypt.hash(updateDosenPembimbingMagang.user.password, 10) : undefined,
          },
        },
      },
    }).finally(() => {
      this.prisma.$disconnect();
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Diubah',
      data: updatedDosen,
    };
  }

  async createBulk(data: any) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data dosen pembimbing magang');
    }

    let dosenBaru = [];

    for (let i = 0; i < data.length; i++) {
      dosenBaru.push(
        await this.prisma.dosenPembimbingMagang.create({
          data: {
            nip: data[i].nip,
            nama: data[i].nama,
            prodi: data[i].prodi,
            user: {
              create: {
                email: data[i].email,
                password: await bcrypt.hash(data[i].password, 10),
                tahunAjaran: {
                  connect: {
                    tahun: (await this.prisma.tahunAjaran.findFirst({
                      where: {
                        isActive: true,
                      },
                      select: {
                        tahun: true,
                      },
                    })).tahun,
                  }
                },
                userRoles: {
                  create: {
                    roleId: 3,
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
      message: 'Data Dosen Pembimbing Berhasil Ditambahkan',
      data: dosenBaru,
    };
  }
}
