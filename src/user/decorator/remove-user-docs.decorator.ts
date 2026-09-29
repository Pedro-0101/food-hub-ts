import { applyDecorators, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function ApiRemoveUser() {
  return applyDecorators(
    Delete(':id'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Remove um usuário pelo ID' }),
    ApiParam({ name: 'id', description: 'ID (UUID) do usuário' }),
    ApiOkResponse({ description: 'Usuário removido com sucesso' }),
    ApiNotFoundResponse({ description: 'Usuário não encontrado' }),
  );
}
