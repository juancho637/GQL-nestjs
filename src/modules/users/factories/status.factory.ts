import { Injectable } from '@nestjs/common';
import { Example1Strategy, Example2Strategy } from '../strategies';
import { StatusStrategyInterface } from '../interfaces';

@Injectable()
export class StatusFactory {
  constructor(
    private readonly strategy1: Example1Strategy,
    private readonly strategy2: Example2Strategy,
  ) {}

  private strategies: Record<string, StatusStrategyInterface> = {
    f1: this.strategy1,
    f2: this.strategy2,
  };

  getStrategy(strategy: string): StatusStrategyInterface {
    return this.strategies[strategy];
  }
}
