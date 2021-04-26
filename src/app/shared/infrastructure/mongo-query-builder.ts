import { FilterQuery } from "mongoose";
import { QueryBuilder } from "./query-builder";


// interface Query<T> {
//     [field in keyof T]?: field extends 
// }

export class MongoQueryBuilder<T extends Object> implements QueryBuilder<T> {
  private query: any;//FilterQuery<T>;

  constructor() {
    this.query = {};
  }

  startsWith(field: keyof T, prefix: string) {
    this.query[field] = { $regex: '^' + prefix };
    return this;
  }

  endsWith(field: keyof T, suffix: string) {
    this.query[field] = { $regex: suffix + '$' };
    return this;
  }

  contains(field: keyof T, value: string) {
    this.query[field] = { $regex: value, $options: 'i' };
    return this;
  }

  greaterThan(field: keyof T, count: number) {
    this.query[field] = { ...this.query[field], $gt: count };
    return this;
  }

  greaterThanOrEquals(field: keyof T, count: number) {
    this.query[field] = { ...this.query[field], $gte: count };
    return this;
  }

  lessThan(field: keyof T, count: number) {
    this.query[field] = { ...this.query[field], $lt: count };
    return this;
  }

  lessThanOrEquals(field: keyof T, count: number) {
    this.query[field] = { ...this.query[field], $lte: count };
    return this;
  }

  or(field: keyof T, value: any) {
    if (!this.query.$or) this.query.$or = [];
    this.query.$or.push({ [field]: value });
    return this;
  }

  and(field: keyof T, value: any) {
    if (!this.query.$and) this.query.$and = [];
    this.query.$and.push({ [field]: value });
    return this;
  }

  match(field: keyof T, value: any) {
    this.query[field] = value;
    return this;
  }

  all(field: keyof T, values: any[]) {
    this.query[field] = { ...this.query[field], $all: values };
    return this;
  }

  buildQueryJSON(): object {
    return this.query;
  }
}

interface Operator {}

const and = (...operators: Operator[]) => {

}

const or = (...operators: Operator[]) => {

}