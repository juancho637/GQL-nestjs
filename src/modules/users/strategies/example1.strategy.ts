import { Injectable, Logger } from '@nestjs/common';
import { StatusStrategyInterface } from '../interfaces';

@Injectable()
export class Example1Strategy implements StatusStrategyInterface {
  constructor(private readonly logger: Logger) {}

  async execute(): Promise<string> {
    this.logger.log('[Example1Strategy] Example logger');

    return 'Example1Strategy';
  }
}
