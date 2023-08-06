import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User, UsersService } from '@app/users';
import { SignInInput, SignUpInput } from './dto';
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);

    const { accessToken, expiresIn } = this.generateJwtToken(user.id);

    return { accessToken, expiresIn };
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(signInInput.email);

    if (!compareSync(signInInput.password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const { accessToken, expiresIn } = this.generateJwtToken(user.id);

    return { accessToken, expiresIn };
  }

  refreshToken(user: User): AuthResponse {
    const { accessToken, expiresIn } = this.generateJwtToken(user.id);

    return { accessToken, expiresIn };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    delete user.password;

    return user;
  }

  private generateJwtToken(userId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const token = this.jwtService.sign({ sub: userId });
    const decode = this.jwtService.decode(token) as {
      sub: string;
      iat: number;
      exp: number;
    };

    return { accessToken: token, expiresIn: decode.exp };
  }
}
