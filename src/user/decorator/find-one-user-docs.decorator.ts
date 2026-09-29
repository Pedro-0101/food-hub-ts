import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity.js';

export function ApiFindOneUser() {
  return applyDecorators(
    Get(':id'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Busca um usuário pelo ID' }),
    ApiParam({ name: 'id', description: 'ID (UUID) do usuário' }),
    ApiOkResponse({ type: User }),
    ApiNotFoundResponse({ description: 'Usuário não encontrado' }),
  );
}
