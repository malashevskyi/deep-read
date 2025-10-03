declare module "ts-case-convert" {
  /**
   * Recursively converts object keys from snake_case to camelCase.
   */
  export type CamelCase<T> = T extends object
    ? {
        [K in keyof T as K extends string ? SnakeToCamel<K> : K]: CamelCase<
          T[K]
        >;
      }
    : T;

  /**
   * Recursively converts object keys from camelCase to snake_case.
   */
  export type SnakeCase<T> = T extends object
    ? {
        [K in keyof T as K extends string ? CamelToSnake<K> : K]: SnakeCase<
          T[K]
        >;
      }
    : T;

  // Internal helper types (не експортуються, але потрібні для роботи)
  type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamel<U>>}`
    : S;

  type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
    ? U extends Uncapitalize<U>
      ? `${T}${CamelToSnake<U>}`
      : `${T}_${CamelToSnake<Uncapitalize<U>>}`
    : S;
}
