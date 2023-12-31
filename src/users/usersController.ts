import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find(): UserEntity[] {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): UserResponseDto {
    return this.userService.findUserById(id);
  }

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): UserResponseDto {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.userService.deleteUser(id);
  }
}
