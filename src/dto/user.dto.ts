import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ description: 'nome do usuário' })
  name: string;

  @ApiProperty()
  email: string;
}