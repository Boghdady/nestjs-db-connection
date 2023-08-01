import { UsersController } from './usersController';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
