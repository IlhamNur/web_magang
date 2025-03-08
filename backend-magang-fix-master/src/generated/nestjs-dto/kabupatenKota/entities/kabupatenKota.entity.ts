
import {Provinsi} from '../../provinsi/entities/provinsi.entity'
import {Satker} from '../../satker/entities/satker.entity'


export class KabupatenKota {
  kabupatenKotaId: number ;
provinsiId: number ;
kodeKabupatenKota: string ;
nama: string ;
provinsi?: Provinsi ;
satker?: Satker  | null;
}
