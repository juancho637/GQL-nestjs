import { Injectable, Logger } from '@nestjs/common';
import { StatusStrategyInterface } from '../interfaces';

@Injectable()
export class Example3Strategy implements StatusStrategyInterface {
  constructor(private readonly logger: Logger) {}

  async execute(): Promise<string> {
    this.logger.log('[Example3Strategy] Example logger');

    return 'Example3Strategy';
  }
}
