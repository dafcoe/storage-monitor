export function getStorageItemSize(adapter: Storage, key: string): number {
  return (key.length + (adapter?.[key] || []).length) * 2; // "* 2" because char in js is stored as UTF-16 (takes 2 bytes)
}
