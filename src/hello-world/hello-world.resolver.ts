import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Int, { name: 'randomFromZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to = 10,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
