
import {Satker} from '../../satker/entities/satker.entity'
import {PembimbingLapangan} from '../../pembimbingLapangan/entities/pembimbingLapangan.entity'
import {User} from '../../user/entities/user.entity'
import {LaporanMagang} from '../../laporanMagang/entities/laporanMagang.entity'
import {DosenPembimbingMagang} from '../../dosenPembimbingMagang/entities/dosenPembimbingMagang.entity'
import {Presensi} from '../../presensi/entities/presensi.entity'
import {TipeKegiatan} from '../../tipeKegiatan/entities/tipeKegiatan.entity'
import {IzinPresensi} from '../../izinPresensi/entities/izinPresensi.entity'
import {PilihanSatker} from '../../pilihanSatker/entities/pilihanSatker.entity'
import {KegiatanHarian} from '../../kegiatanHarian/entities/kegiatanHarian.entity'
import {PresensiManual} from '../../presensiManual/entities/presensiManual.entity'
import {RekapKegiatanBulanan} from '../../rekapKegiatanBulanan/entities/rekapKegiatanBulanan.entity'
import {IzinBimbinganSkripsi} from '../../izinBimbinganSkripsi/entities/izinBimbinganSkripsi.entity'
import {PresentasiLaporanMagang} from '../../presentasiLaporanMagang/entities/presentasiLaporanMagang.entity'
import {PesertaBimbinganMahasiswa} from '../../pesertaBimbinganMahasiswa/entities/pesertaBimbinganMahasiswa.entity'
import {Penilaian} from '../../penilaian/entities/penilaian.entity'


export class Mahasiswa {
  mahasiswaId: number ;
dosenId: number  | null;
pemlapId: number  | null;
userId: number  | null;
satkerId: number  | null;
nim: string ;
nama: string ;
prodi: string ;
kelas: string ;
alamat: string ;
nomorRekening: string  | null;
createdAt: Date ;
updatedAt: Date ;
satker?: Satker  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
user?: User  | null;
laporanMagang?: LaporanMagang  | null;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
presensi?: Presensi[] ;
tipeKegiatan?: TipeKegiatan[] ;
izinPresensi?: IzinPresensi[] ;
pilihanSatker?: PilihanSatker[] ;
kegiatanHarian?: KegiatanHarian[] ;
presensiManual?: PresensiManual[] ;
rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
presentasiLaporanMagang?: PresentasiLaporanMagang[] ;
pesertaBimbinganMagang?: PesertaBimbinganMahasiswa[] ;
penilaian?: Penilaian  | null;
}
