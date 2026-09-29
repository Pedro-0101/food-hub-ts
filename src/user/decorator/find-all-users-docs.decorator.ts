import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity.js';

export function ApiFindAllUsers() {
  return applyDecorators(
    Get(),
    ApiOperation({ summary: 'Lista todos os usuários' }),
    ApiOkResponse({ type: [User] }),
  );
}
