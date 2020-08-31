import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}