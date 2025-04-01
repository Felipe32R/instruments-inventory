export type Override<
  Target extends Record<string, unknown>,
  Source extends Partial<Record<KeyofDistributeUnions<Target>, unknown>>,
> = Target extends unknown
  ? Omit<Target, keyof Source> &
      Pick<Source, keyof Source & KeyofDistributeUnions<Target>>
  : never;

export type KeyofDistributeUnions<T> = T extends unknown ? keyof T : never;
