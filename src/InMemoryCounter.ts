import { CounterInterface } from "./counterInterface";

export class InMemoryCounter implements CounterInterface {
  private count = 0;

  increment(): void {
    this.count++;
  }

  getCount(): number {
    return this.count;
  }
}