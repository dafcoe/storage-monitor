import { getStorageItemSize } from './storage-drive.helper';
import { StorageDriveQuotaInterface } from './storage-drive.interface';
import {
  DUMMY_DATA_KEY,
  DUMMY_DATA_VALUE,
} from './storage-drive.constant';

export class StorageDriveQuota implements StorageDriveQuotaInterface {

  public limit: number = 0;

  public used: number = 0;

  public free: number = 0;

  constructor(
    private readonly adapter: Storage,
  ) {}

  public async init(): Promise<void> {
    await this.calculateLimit();
    await this.refresh();
  }

  public async refresh(): Promise<void> {
    this.used = await this.getUsed();
    this.free = this.getFree();
  }

  public getInPercentage(): StorageDriveQuotaInterface {
    const usedInPercentage = (this.used * 100) / this.limit;

    return {
      limit: 100,
      used: usedInPercentage,
      free: 100 - usedInPercentage,
    };
  }

  private calculateLimit(): Promise<void> {
    return new Promise(async (resolve) => {
      let limitReached = false;

      while (!limitReached) {
        const partialLimit = await this.getPartialLimit();

        if (partialLimit === this.limit) limitReached = true;
        this.limit = partialLimit;
      }

      this.adapter.removeItem(DUMMY_DATA_KEY);
      resolve();
    });
  }

  private getPartialLimit(): Promise<number> {
    return new Promise(async (resolve) => {
      let dummyDataValue = DUMMY_DATA_VALUE;
      let limitReached = false;

      while (!limitReached) {
        try {
          this.adapter.setItem(
            DUMMY_DATA_KEY,
            `${this.adapter.getItem(DUMMY_DATA_KEY) || ''}${dummyDataValue}`,
          );
          dummyDataValue += dummyDataValue;
        } catch (e: unknown) {
          limitReached = true;
        }
      }

      await resolve(this.getUsed());
    });
  }

  private getUsed(): Promise<number> {
    return new Promise((resolve) => {
      let used = 0;

      Object.keys(this.adapter).forEach((key) => {
        used += getStorageItemSize(this.adapter, key);
      });

      resolve(used);
    });
  }

  private getFree(): number {
    return this.limit - this.used;
  }
}
