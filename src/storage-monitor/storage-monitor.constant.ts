import { StorageMonitorOptionsType } from './storage-monitor.type';

export const DEFAULT_ADAPTER: Storage = localStorage;

export const DEFAULT_AUTO_RATE_MIN_MS = 5000;

export const DEFAULT_OPTIONS: StorageMonitorOptionsType = {
  showWidget: true,
  autoReloadRateMs: DEFAULT_AUTO_RATE_MIN_MS,
};

export const WIDGET_CLASS_BASE = 'storage-monitor-widget';

export const WIDGET_QUOTA_ALMOST_REACHED_THRESHOLD_PERCENTAGE = 90;

export const WIDGET_ICONS = {
  RELOAD: `
    <svg width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M400,148l-21.12-24.57A191.43,191.43,0,0,0,240,64C134,64,48,150,48,256s86,192,192,192A192.09,192.09,0,0,0,421.07,320" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/>
      <path d="M464,97.42V208a16,16,0,0,1-16,16H337.42c-14.26,0-21.4-17.23-11.32-27.31L436.69,86.1C446.77,76,464,83.16,464,97.42Z"/>
    </svg>
  `,
};
