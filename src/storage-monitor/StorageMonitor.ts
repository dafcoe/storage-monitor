import { StorageMonitorWidget } from './StorageMonitorWidget';
import {
  DEFAULT_ADAPTER,
  DEFAULT_AUTO_RATE_MIN_MS,
  DEFAULT_OPTIONS,
} from './storage-monitor.constant';
import { StorageDrive } from '../storage-drive/StorageDrive';
import { StorageMonitorOptionsType } from './storage-monitor.type';

export class StorageMonitor {

  private drive: StorageDrive | undefined = undefined;

  constructor(
    private adapter: Storage = DEFAULT_ADAPTER,
    private options: StorageMonitorOptionsType = DEFAULT_OPTIONS,
  ) {
    this.ensureDataIntegrity();

    (async () => {
      await this.init();
      if (this.options.showWidget) await this.initWidget();
    })();
  }

  private ensureDataIntegrity(): void {
    this.ensureAdapterIntegrity();
    this.ensureAutoReloadRateMsIntegrity();
  }

  private ensureAdapterIntegrity(): void {
    if (this.adapter === localStorage || this.adapter === sessionStorage) return;

    console.warn('Specified adapter not valid. Falling back to the default value (localStorage).');
    this.adapter = DEFAULT_ADAPTER;
  }

  private ensureAutoReloadRateMsIntegrity(): void {
    if (!this.options.autoReloadRateMs || this.options.autoReloadRateMs >= DEFAULT_AUTO_RATE_MIN_MS) return;

    console.warn(`Auto-reload rate not valid. Falling back to the default/minimum value (${DEFAULT_AUTO_RATE_MIN_MS}). `);
    this.options.autoReloadRateMs = Math.max(this.options.autoReloadRateMs, DEFAULT_AUTO_RATE_MIN_MS)
  }

  private async init(): Promise<void> {
    this.drive = new StorageDrive(this.adapter, this.options.autoReloadRateMs);
    await this.drive.init();
  }

  private async initWidget(): Promise<void> {
    const widget = new StorageMonitorWidget(this.adapter, this.drive);
    await widget.init();
  }
}
