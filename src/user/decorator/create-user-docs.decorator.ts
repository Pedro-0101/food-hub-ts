import { applyDecorators, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity.js';

export function ApiCreateUser() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Cria um novo usuário' }),
    ApiCreatedResponse({ type: User }),
  );
}
