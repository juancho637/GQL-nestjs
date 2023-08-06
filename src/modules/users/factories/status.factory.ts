import { Injectable } from '@nestjs/common';
import { StatusStrategyInterface } from '../interfaces';
import {
  Example1Strategy,
  Example2Strategy,
  Example3Strategy,
} from '../strategies';

@Injectable()
export class StatusFactory {
  constructor(
    private readonly strategy1: Example1Strategy,
    private readonly strategy2: Example2Strategy,
    private readonly strategy3: Example3Strategy,
  ) {}

  private strategies: Record<string, StatusStrategyInterface> = {
    f1: this.strategy1,
    f2: this.strategy2,
    f3: this.strategy3,
  };

  getStrategy(strategy: string): StatusStrategyInterface {
    return this.strategies[strategy];
  }
}
