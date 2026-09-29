import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiCreateUser } from './decorator/create-user-docs.decorator.js';
import { ApiFindAllUsers } from './decorator/find-all-users-docs.decorator.js';
import { ApiFindOneUser } from './decorator/find-one-user-docs.decorator.js';
import { ApiUpdateUser } from './decorator/update-user-docs.decorator.js';
import { ApiRemoveUser } from './decorator/remove-user-docs.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from './entities/role.enum.js';

@ApiTags('users')
@Roles(Role.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreateUser()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiFindAllUsers()
  findAll() {
    return this.userService.findAll();
  }

  @ApiFindOneUser()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiUpdateUser()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiRemoveUser()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
