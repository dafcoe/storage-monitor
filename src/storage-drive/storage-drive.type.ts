export type StorageDriveSizeType = {
  bytes: number;
  percentage: number;
};

export type StorageDriveDataItemType = {
  value: unknown;
  size: StorageDriveSizeType;
};
