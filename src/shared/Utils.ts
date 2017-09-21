
export function transformSetToFilter<T>(arg: Set<T>): Array<T> | undefined {
  if (arg.size > 0) {
    return Array.from(arg);
  } else return undefined;
}
