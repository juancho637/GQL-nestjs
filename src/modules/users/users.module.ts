import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { StatusFactory } from './factories/status.factory';
import {
  Example1Strategy,
  Example2Strategy,
  Example3Strategy,
} from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    StatusFactory,
    Logger,
    Example1Strategy,
    Example2Strategy,
    Example3Strategy,
  ],
  exports: [UsersService],
})
export class UsersModule {}
