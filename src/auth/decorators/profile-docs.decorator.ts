import { applyDecorators, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function ApiProfile() {
  return applyDecorators(
    Get('me'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Retorna os dados do usuário logado (via token)' }),
    ApiOkResponse({
      description: 'Dados do usuário autenticado (id, name, email, role)',
    }),
  );
}
