import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({ description: 'JWT de acesso (curta duração)' })
  accessToken: string;

  @ApiProperty({ description: 'JWT de renovação (longa duração)' })
  refreshToken: string;
}
