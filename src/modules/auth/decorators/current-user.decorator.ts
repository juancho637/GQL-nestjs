import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums';
import { User } from '../../../modules/users';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], contex: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(contex);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in request');
    }

    if (
      roles.length &&
      !user.roles.some((role) => roles.includes(role as ValidRoles))
    ) {
      throw new ForbiddenException('User does not have enough privileges');
    }

    return user;
  },
);
