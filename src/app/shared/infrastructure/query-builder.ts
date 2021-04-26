export interface QueryBuilder<T> {
  match(field: keyof T, value: any): void;
  startsWith(field: keyof T, prefix: string): void;
  endsWith(field: keyof T, suffix: string): void;
  contains(field: keyof T, value: string): void;
  greaterThan(field: keyof T, count: number): void;
  greaterThanOrEquals(field: keyof T, count: number): void;
  lessThan(field: keyof T, count: number): void;
  lessThanOrEquals(field: keyof T, count: number): void;
  or(field: keyof T, value: any): void;
  and(field: keyof T, value: any): void;
  buildQueryJSON(): object;
}
