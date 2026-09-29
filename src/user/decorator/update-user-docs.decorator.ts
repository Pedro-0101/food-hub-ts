import { applyDecorators, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity.js';

export function ApiUpdateUser() {
  return applyDecorators(
    Patch(':id'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Atualiza um usuário pelo ID' }),
    ApiParam({ name: 'id', description: 'ID (UUID) do usuário' }),
    ApiOkResponse({ type: User }),
    ApiNotFoundResponse({ description: 'Usuário não encontrado' }),
    ApiConflictResponse({ description: 'E-mail já cadastrado' }),
  );
}
