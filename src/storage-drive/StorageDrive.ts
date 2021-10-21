import { StorageDriveQuota } from './StorageDriveQuota';
import { StorageDriveData } from './StorageDriveData';
import {
  DRIVE_UPDATE_POLL_WAIT_MS,
  EVENT_TYPE_DRIVE_CHANGE,
  EVENT_TYPE_DRIVE_DATA_CHANGE,
} from './storage-drive.constant';

export class StorageDrive {

  public quota: StorageDriveQuota | undefined = undefined;

  public data: StorageDriveData | undefined = undefined;

  constructor(
    private readonly adapter: Storage,
    private readonly driveUpdateWaitMs: number = DRIVE_UPDATE_POLL_WAIT_MS,
  ) {}

  public async init(): Promise<void> {
    this.quota = new StorageDriveQuota(this.adapter);
    await this.quota.init();

    this.data = new StorageDriveData(this.adapter, this.quota.limit, this.driveUpdateWaitMs);
    await this.data.init();

    this.registerDataChangeEventListener();
  }

  private registerDataChangeEventListener(): void {
    document.addEventListener(EVENT_TYPE_DRIVE_DATA_CHANGE, async () => {
      await this.quota?.refresh();
      await this.data?.refresh();
      document.dispatchEvent(new Event(EVENT_TYPE_DRIVE_CHANGE));
    });
  }
}
