import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTahunAjaranDto {
  @IsNotEmpty()
  @IsString({
    message: 'Tahun ajaran harus berupa string',
  })
  @MinLength(9)
  tahun: string;
}
