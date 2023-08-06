import { Injectable, Logger } from '@nestjs/common';
import { StatusStrategyInterface } from '../interfaces';

@Injectable()
export class Example2Strategy implements StatusStrategyInterface {
  constructor(private readonly logger: Logger) {}

  async execute(): Promise<string> {
    this.logger.log('[Example2Strategy] Example logger');

    return 'Example2Strategy';
  }
}
