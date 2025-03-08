import { IsOptional, IsString } from "class-validator";
import { DosenPembimbingMagang } from "../../dosen-pembimbing-magang/dto/dosenPembimbingMagang.entity";
import { PembimbingLapangan } from "../../pembimbing-lapangan/dto/pembimbingLapangan.entity";
import { Satker } from "../../satker/dto/satker/satker.entity";

export class UpdateMahasiswaDto {
  @IsOptional()
  @IsString()
  nim?: string;

  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  prodi: string;

  @IsOptional()
  @IsString()
  kelas: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @IsOptional()
  dosenPembimbingMagang?: DosenPembimbingMagang;

  @IsOptional()
  pembimbingLapangan?: PembimbingLapangan;

  @IsOptional()
  satker?: Satker;
}
