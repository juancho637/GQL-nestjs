export interface StatusStrategyInterface {
  execute(): Promise<string>;
}
