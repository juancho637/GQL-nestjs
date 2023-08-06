import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '@app/users';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto';
import { AuthResponse } from './types';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<AuthResponse> {
    return await this.authService.signIn(signInInput);
  }

  @Query(() => AuthResponse)
  @UseGuards(JwtAuthGuard)
  refreshToken(@CurrentUser() currentUser: User): AuthResponse {
    return this.authService.refreshToken(currentUser);
  }
}
