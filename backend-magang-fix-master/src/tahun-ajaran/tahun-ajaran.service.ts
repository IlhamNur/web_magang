import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTahunAjaranDto } from '../tahun-ajaran/dto/create-tahunAjaran.dto';
import { UpdateTahunAjaranDto } from '../tahun-ajaran/dto/update-tahunAjaran.dto';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class TahunAjaranService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request,
  ) { }

  async create(createTahunAjaranDto: CreateTahunAjaranDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'TahunAjaran')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat tahun ajaran');
    }

    const tahunAjaran = await this.prismaService.tahunAjaran.create({
      data: {
        tahun: createTahunAjaranDto.tahun,
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    //create kapasitas satker dengan tahun ajaran yang baru
    // get all satker
    const satkers = await this.prismaService.satker.findMany();

    // create kapasitas satker
    await this.prismaService.kapasitasSatkerTahunAjaran.createMany({
      data: satkers.map((satker) => ({
        tahunAjaranId: tahunAjaran.tahunAjaranId,
        satkerId: satker.satkerId,
      })),
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    // create dosen yang sama pada tahun yg aktif tapi gunakan tahun ajaran baru
    const dosenPembimbingMagangPadaTahunAktif = await this.prismaService.dosenPembimbingMagang.findMany({
      where: {
        user: {
          tahunAjaran: {
            tahunAjaranId: (await this.prismaService.tahunAjaran.findFirst({
              where: {
                isActive: true,
              },
            }).finally(() => {
              this.prismaService.$disconnect();
            })).tahunAjaranId
          },
        },
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    const userDosens = await this.prismaService.user.findMany({
      where: {
        tahunAjaran: {
          tahunAjaranId: (await this.prismaService.tahunAjaran.findFirst({
            where: {
              isActive: true,
            },
          }).finally(() => {
            this.prismaService.$disconnect();
          })).tahunAjaranId
        },
        userRoles: {
          every: {
            roleId: 3,
          },
        },
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    // create dosen pembimbing magang
    for (const dosen of dosenPembimbingMagangPadaTahunAktif) {
      const userDosen = userDosens.find((user) => user.userId === dosen.userId);

      await this.prismaService.dosenPembimbingMagang.create({
        data: {
          nip: dosen.nip,
          nama: dosen.nama,
          prodi: dosen.prodi,
          user: {
            create: {
              email: userDosen.email,
              password: userDosen.password,
              tahunAjaran: {
                connect: {
                  tahunAjaranId: tahunAjaran.tahunAjaranId,
                },
              },
            },
          },
        },
      }).finally(() => {
        this.prismaService.$disconnect();
      });
    }

    return {
      status: "success",
      message: 'Tahun ajaran berhasil dibuat',
      data: tahunAjaran,
    };
  }

  async findAllBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'TahunAjaran')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat tahun ajaran');
    }

    const tahunAjarans = await this.prismaService.tahunAjaran.findMany({
      where: {
        AND: [accessibleBy(ability).TahunAjaran],
        tahun: {
          contains: params.tahun,
        },
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    return {
      status: "success",
      message: 'Tahun ajaran berhasil ditemukan',
      data: tahunAjarans,
    };
  }

  async update(tahunAjaranId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'TahunAjaran')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate tahun ajaran');
    }

    await this.prismaService.tahunAjaran.findFirstOrThrow({
      where: {
        tahunAjaranId: parseInt(tahunAjaranId.toString()),
        AND: [accessibleBy(ability).TahunAjaran],
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate tahun ajaran ini');
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    const tahunAjaran = await this.prismaService.tahunAjaran.update({
      where: {
        tahunAjaranId: tahunAjaranId,
      },
      data: {
        isActive: true,
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    // set tahun ajaran lainnya menjadi tidak aktif
    await this.prismaService.tahunAjaran.updateMany({
      where: {
        tahunAjaranId: {
          not: tahunAjaranId,
        },
      },
      data: {
        isActive: false,
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    // set tahun ajaran admin, admin satker, admin provinsi, tim magang, BAU, BAAK menjadi yang baru
    await this.prismaService.user.updateMany({
      where: {
        userRoles: {
          every: {
            OR: [
              {
                roleId: 1,
              },
              {
                roleId: 2,
              },
              {
                roleId: 5,
              },
              {
                roleId: 6,
              },
              {
                roleId: 7,
              },
              {
                roleId: 8,
              }
            ],
          },
        },
      },
      data: {
        tahunAjaranId: tahunAjaran.tahunAjaranId,
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    return {
      status: "success",
      message: 'Tahun ajaran berhasil diupdate',
      data: tahunAjaran,
    };
  }


  async remove(tahunAjaranId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'TahunAjaran')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus tahun ajaran');
    }

    await this.prismaService.tahunAjaran.findFirstOrThrow({
      where: {
        tahunAjaranId: parseInt(tahunAjaranId.toString()),
        AND: [accessibleBy(ability).TahunAjaran],
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus tahun ajaran ini');
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    const tahunAjaran = await this.prismaService.tahunAjaran.findFirst({
      where: {
        tahunAjaranId: tahunAjaranId,
      },
    }).finally(() => {
      this.prismaService.$disconnect();
    });

    if (!tahunAjaran.isActive) {
      await this.prismaService.tahunAjaran.delete({
        where: {
          tahunAjaranId: tahunAjaranId,
        },
      }).finally(() => {
        this.prismaService.$disconnect();
      });

      return {
        status: "success",
        message: 'Tahun ajaran berhasil dihapus',
        data: tahunAjaran,
      };
    }

    return {
      status: "error",
      message: 'Tahun ajaran tidak bisa dihapus karena aktif',
      data: tahunAjaran,
    };
  }
}
