import { applyDecorators, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthTokensDto } from '../dto/auth-tokens.dto.js';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard.js';
import { Public } from './public.decorator.js';

export function ApiRefreshTokens() {
  return applyDecorators(
    Public(),
    UseGuards(JwtRefreshGuard),
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Renova os tokens a partir do refresh token' }),
    ApiOkResponse({ type: AuthTokensDto }),
    ApiUnauthorizedResponse({ description: 'Refresh token inválido' }),
  );
}
