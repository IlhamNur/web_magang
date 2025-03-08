
import {AdminSatker} from '../../adminSatker/entities/adminSatker.entity'
import {Provinsi} from '../../provinsi/entities/provinsi.entity'
import {KabupatenKota} from '../../kabupatenKota/entities/kabupatenKota.entity'
import {Mahasiswa} from '../../mahasiswa/entities/mahasiswa.entity'
import {PilihanSatker} from '../../pilihanSatker/entities/pilihanSatker.entity'
import {PembimbingLapangan} from '../../pembimbingLapangan/entities/pembimbingLapangan.entity'
import {KapasitasSatkerTahunAjaran} from '../../kapasitasSatkerTahunAjaran/entities/kapasitasSatkerTahunAjaran.entity'


export class Satker {
  satkerId: number ;
povinsiId: number ;
kabupatenKotaId: number ;
nama: string ;
kodeSatker: string ;
email: string ;
alamat: string ;
latitude: number  | null;
longitude: number  | null;
internalBPS: boolean ;
adminSatker?: AdminSatker  | null;
provinsi?: Provinsi ;
kabupatenKota?: KabupatenKota ;
mahasiswa?: Mahasiswa[] ;
pilihanSatker?: PilihanSatker[] ;
pembimbingLapangan?: PembimbingLapangan[] ;
kapasitasSatkerTahunAjaran?: KapasitasSatkerTahunAjaran[] ;
}
