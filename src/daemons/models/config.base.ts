// Model
export interface BaseConfig<T extends string> {
  readonly type: T;

  id: string;
  version: number;
}
