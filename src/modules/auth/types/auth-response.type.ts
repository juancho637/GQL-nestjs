import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { name: 'access_token' })
  accessToken: string;

  @Field(() => Int, { name: 'expires_in' })
  expiresIn: number;
}
