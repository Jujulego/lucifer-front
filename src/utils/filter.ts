// Types
export type Filter<T> = Partial<T>;
export type Predicate<T> = (obj: T) => boolean;

// Utils
export function toPredicate<T>(filter: Filter<T>): Predicate<T> {
  const fields = Object.keys(filter) as Array<keyof T>;
  return (obj) => fields.every(field => obj[field] === filter[field]);
}

export function filter<T>(array: T[], filter: Filter<T>): T[] {
  return array.filter(toPredicate(filter));
}