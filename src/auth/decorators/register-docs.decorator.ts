import { applyDecorators, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthTokensDto } from '../dto/auth-tokens.dto.js';
import { Public } from './public.decorator.js';

export function ApiRegister() {
  return applyDecorators(
    Public(),
    Post('register'),
    ApiOperation({ summary: 'Registra um novo usuário e retorna os tokens' }),
    ApiCreatedResponse({ type: AuthTokensDto }),
    ApiConflictResponse({ description: 'E-mail já cadastrado' }),
  );
}
