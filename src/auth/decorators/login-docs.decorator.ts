import { applyDecorators, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthTokensDto } from '../dto/auth-tokens.dto.js';
import { LocalAuthGuard } from '../guards/local-auth.guard.js';
import { Public } from './public.decorator.js';

export function ApiLogin() {
  return applyDecorators(
    Public(),
    UseGuards(LocalAuthGuard),
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Autentica o usuário e retorna os tokens' }),
    ApiOkResponse({ type: AuthTokensDto }),
    ApiUnauthorizedResponse({ description: 'Credenciais inválidas' }),
  );
}
