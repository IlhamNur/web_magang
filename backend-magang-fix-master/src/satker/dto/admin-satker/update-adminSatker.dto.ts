import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateAdminSatkerDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
