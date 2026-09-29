import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john@doe.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPass123' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
