import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { ApiLogin } from './decorators/login-docs.decorator.js';
import { ApiLogout } from './decorators/logout-docs.decorator.js';
import { ApiProfile } from './decorators/profile-docs.decorator.js';
import { ApiRefreshTokens } from './decorators/refresh-token-docs.decorator.js';
import { ApiRegister } from './decorators/register-docs.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import type { AuthenticatedUser } from './interfaces/jwt-payload.interface.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiRegister()
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiLogin()
  login(@Body() _loginDto: LoginDto, @CurrentUser() user: AuthenticatedUser) {
    return this.authService.login(user);
  }

  @ApiRefreshTokens()
  refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.authService.refreshTokens(userId, refreshTokenDto.refresh_token);
  }

  @ApiLogout()
  logout(@CurrentUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @ApiProfile()
  profile(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
