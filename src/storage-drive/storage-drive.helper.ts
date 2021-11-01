export function getStorageItemSize(adapter: Storage, key: string): number {
  return (key.length + (adapter?.[key] || []).length) * 2; // "* 2" because char in js is stored as UTF-16 (takes 2 bytes)
}

export const debounce = (callback: Function, context: unknown, timeout: number): CallableFunction => {
  let timeoutId: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, timeout);
  };
}
