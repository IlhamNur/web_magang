
import {AdminProvinsi} from '../../adminProvinsi/entities/adminProvinsi.entity'
import {Satker} from '../../satker/entities/satker.entity'
import {KabupatenKota} from '../../kabupatenKota/entities/kabupatenKota.entity'


export class Provinsi {
  provinsiId: number ;
nama: string ;
kodeProvinsi: string ;
adminProvinsi?: AdminProvinsi  | null;
satker?: Satker[] ;
kabupatenKota?: KabupatenKota[] ;
}
