
import {User} from '../../user/entities/user.entity'
import {Provinsi} from '../../provinsi/entities/provinsi.entity'


export class AdminProvinsi {
  adminProvinsiId: number ;
userId: number ;
provinsiId: number ;
nama: string ;
nip: string ;
user?: User ;
provinsi?: Provinsi ;
}
