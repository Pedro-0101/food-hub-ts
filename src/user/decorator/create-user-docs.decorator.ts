import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity.js';

export function ApiCreateUser() {
  return applyDecorators(
    Post(),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Cria um novo usuário' }),
    ApiCreatedResponse({ type: User }),
    ApiConflictResponse({ description: 'E-mail já cadastrado' }),
  );
}
