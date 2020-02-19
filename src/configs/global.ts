declare global {
  interface ObjectConstructor {
    tsKeys<T extends object>(obj: T): Array<keyof T>
  }
}

Object.tsKeys = Object.keys as any;

export default null;