import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function ApiLogout() {
  return applyDecorators(
    Post('logout'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Invalida o refresh token do usuário logado' }),
    ApiNoContentResponse({ description: 'Logout realizado com sucesso' }),
  );
}
