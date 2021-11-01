import md5 from 'md5';
import { StorageDriveDataItemType } from './storage-drive.type';
import {
  debounce,
  getStorageItemSize,
} from './storage-drive.helper';
import {
  EVENT_TYPE_DRIVE_DATA_CHANGE,
  DRIVE_UPDATE_POLL_WAIT_MS,
  REFRESH_WAIT,
} from './storage-drive.constant';

export class StorageDriveData {

  public items: Record<string, StorageDriveDataItemType> = {};

  private checksum: string | undefined = undefined;

  constructor(
    private readonly adapter: Storage,
    private readonly quotaLimit: number,
    private readonly updateWaitMs: number = DRIVE_UPDATE_POLL_WAIT_MS,
  ) {}

  public async init(): Promise<void> {
    await this.refresh();
    this.watchForChanges();
  }

  public refresh = debounce(
    (): Promise<void> => new Promise((resolve) => {
      this.items = Object.keys(this.adapter).reduce((acc, cur) => ({
        ...acc,
        [cur]: {
          value: this.adapter[cur] ? JSON.parse(JSON.stringify(this.adapter[cur])) : undefined,
          size: {
            bytes: getStorageItemSize(this.adapter, cur),
            percentage: getStorageItemSize(this.adapter, cur) * 100 / this.quotaLimit,
          },
        },
      }), {});

      resolve();
      this.updateChecksum();
    }),
    this,
    REFRESH_WAIT,
  ).bind(this);

  public sortBySize(): void {
    this.items = Object.keys(this.items)
      .sort((a, b) => this.items[b].size.bytes - this.items[a].size.bytes)
      .reduce((acc, cur) => ({
        ...acc,
        [cur]: this.items[cur],
      }), {});
  }

  private watchForChanges(): void {
    setInterval(() => {
      this.updateChecksum();
    }, this.updateWaitMs);
  }

  private updateChecksum(): void {
    const newChecksum = md5(JSON.stringify(this.adapter));

    if (this.checksum !== newChecksum) {
      if (this.checksum) document.dispatchEvent(new Event(EVENT_TYPE_DRIVE_DATA_CHANGE));

      this.checksum = newChecksum;
    }
  }
}
