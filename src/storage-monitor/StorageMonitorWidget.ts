import { getSizeWithUnit } from './storage-monitor.helper';
import {
  WIDGET_CLASS_BASE,
  WIDGET_ICONS,
  WIDGET_QUOTA_ALMOST_REACHED_THRESHOLD_PERCENTAGE,
} from './storage-monitor.constant';
import { styles } from './storage-monitor-widget.style';
import { StorageDrive } from '../storage-drive/StorageDrive';
import { EVENT_TYPE_DRIVE_CHANGE } from '../storage-drive/storage-drive.constant';

export class StorageMonitorWidget {

  constructor(
    private readonly adapter: Storage,
    private readonly drive: StorageDrive | undefined,
  ) {}

  public async init(): Promise<void> {
    await this.create();
    this.update();
    this.registerEventListeners();
  }

  private async create(): Promise<void> {
    return new Promise((resolve) => {
      document.body.appendChild(this.createWrapper());
      resolve();
    });
  }

  private createWrapper(): HTMLElement {
    const element = this.createDocumentElement('div');

    element.innerHTML = `<style>${styles}</style>`;
    element.appendChild(this.createHeader());
    element.appendChild(this.createChart());
    element.appendChild(this.createDetails());
    element.appendChild(this.createItems());

    return element;
  }

  private getAdapterLabelPrefix(): string {
    let adapterLabelPrefix = '';

    if (this.adapter === localStorage) adapterLabelPrefix = 'Local'
    else if (this.adapter === sessionStorage) adapterLabelPrefix = 'Session'

    return adapterLabelPrefix;
  }

  private createHeader(): HTMLElement {
    const headerElement = this.createDocumentElement('div', '__header');
    const headlineElement = this.createDocumentElement('h1', '__headline');
    const headlineText = document.createTextNode(`${this.getAdapterLabelPrefix()} Storage Usage`);
    const reloadIconElement = this.createDocumentElement('span', '__reload-icon');

    headlineElement.appendChild(headlineText);
    reloadIconElement.innerHTML = WIDGET_ICONS.RELOAD;
    headerElement.appendChild(headlineElement);
    headerElement.appendChild(reloadIconElement);

    return headerElement;
  }

  private createChart(): HTMLElement {
    const element = this.createDocumentElement('div', '__chart');

    element.appendChild(this.createChartBar());

    return element;
  }

  private createChartBar(): HTMLElement {
    const chartBarElement = this.createDocumentElement('div', '__chart-bar');
    const chartBarLimitElement = this.createDocumentElement('div', '__chart-bar-limit');
    const chartBarUsedElement = this.createDocumentElement('div', '__chart-bar-used');

    chartBarUsedElement.style.width = '0%';

    chartBarElement.appendChild(chartBarLimitElement);
    chartBarElement.appendChild(chartBarUsedElement);

    return chartBarElement;
  }

  private createDetails(): HTMLElement {
    const element = this.createDocumentElement('div', '__details');

    element.appendChild(this.createDetailsLimit());
    element.appendChild(this.createDetailsUsed());
    element.appendChild(this.createDetailsFree());

    return element;
  }

  private createDetailsLimit(): HTMLElement {
    const limitElement = this.createDocumentElement('div', '__details-limit');
    const limitLabelElement = this.createDocumentElement('span', '__details-limit-label');
    const limitLabelText = document.createTextNode('Capacity: ');
    const limitValueElement = this.createDocumentElement('span', '__details-limit-value');
    const limitValueText = document.createTextNode('--');

    limitLabelElement.appendChild(limitLabelText);
    limitValueElement.appendChild(limitValueText);
    limitElement.appendChild(limitLabelElement);
    limitElement.appendChild(limitValueElement);

    return limitElement;
  }

  private createDetailsUsed(): HTMLElement {
    const usedElement = this.createDocumentElement('div', '__details-used');
    const usedLabelElement = this.createDocumentElement('span', '__details-used-label');
    const usedLabelText = document.createTextNode('Used: ');
    const usedValueElement = this.createDocumentElement('span', '__details-used-value');
    const usedValueText = document.createTextNode('--');

    usedLabelElement.appendChild(usedLabelText);
    usedValueElement.appendChild(usedValueText);
    usedElement.appendChild(usedLabelElement);
    usedElement.appendChild(usedValueElement);

    return usedElement;
  }

  private createDetailsFree(): HTMLElement {
    const freeElement = this.createDocumentElement('div', '__details-free');
    const freeLabelElement = this.createDocumentElement('span', '__details-free-label');
    const freeLabelText = document.createTextNode('Free: ');
    const freeValueElement = this.createDocumentElement('span', '__details-free-value');
    const freeValueText = document.createTextNode('--');

    freeLabelElement.appendChild(freeLabelText);
    freeValueElement.appendChild(freeValueText);
    freeElement.appendChild(freeLabelElement);
    freeElement.appendChild(freeValueElement);

    return freeElement;
  }

  private createItems(): HTMLElement {
    const element = this.createDocumentElement('div', '__items');

    element.appendChild(this.createItemsHeadline());
    element.appendChild(this.createItemList());

    return element;
  }

  private createItemsHeadline(): HTMLElement {
    const headlineElement = this.createDocumentElement('div', '__items-headline');
    const headlineLabelElement = this.createDocumentElement('span', '__items-headline-label');
    const headlineLabelValue = document.createTextNode('Item List');
    const headlineCountElement = this.createDocumentElement('span', '__items-headline-count');
    const headlineCountValue = document.createTextNode('#--');

    headlineLabelElement.appendChild(headlineLabelValue);
    headlineCountElement.appendChild(headlineCountValue);
    headlineElement.appendChild(headlineLabelElement);
    headlineElement.appendChild(headlineCountElement);

    return headlineElement;
  }

  private createItemList(): HTMLElement {
    const element = this.createDocumentElement('ul', '__item-list');

    if (this.drive?.data?.items) {
      Object.keys(this.drive.data.items).forEach((key) => {
        element.appendChild(this.createItemListItem(key));
      });
    }

    return element;
  }

  private createItemListItem(key: string): HTMLElement {
    const listItemElement = this.createDocumentElement('li', '__item-list-item');

    listItemElement.id = key;
    listItemElement.title = key;

    if (this.drive?.data?.items[key]) {
      const listItemBarLimitElement = this.createDocumentElement('div', '__item-list-item-bar-limit');
      const listItemBarUsedElement = this.createDocumentElement('div', '__item-list-item-bar-used');
      const listItemKeyElement = this.createDocumentElement('div', '__item-list-item-key');
      const listItemUsedElement = this.createDocumentElement('div', '__item-list-item-used');
      const listItemKeyValue = document.createTextNode(key);
      const listItemUsedValue = document.createTextNode(getSizeWithUnit(this.drive.data.items[key].size.bytes, 2));

      listItemBarUsedElement.style.width = `${this.drive.data.items[key].size.percentage}%`;

      listItemKeyElement.appendChild(listItemKeyValue);
      listItemUsedElement.appendChild(listItemUsedValue);
      listItemElement.appendChild(listItemBarLimitElement);
      listItemElement.appendChild(listItemBarUsedElement);
      listItemElement.appendChild(listItemKeyElement);
      listItemElement.appendChild(listItemUsedElement);
    }

    return listItemElement;
  }

  private createDocumentElement(tagName: string, className: string = ''): HTMLElement {
    const element = document.createElement(tagName);

    element.classList.add(`${WIDGET_CLASS_BASE}${className}`);

    return element;
  }

  private registerEventListeners(): void {
    this.registerDriveChangeEventListener();
    this.registerReloadClickEventListener();
  }

  private registerDriveChangeEventListener(): void {
    document.addEventListener(EVENT_TYPE_DRIVE_CHANGE, () => {
      this.update();
    });
  }

  private update(): void {
    this.updateChartBar();
    this.updateDetails();
    this.updateItems();
  }

  private updateChartBar(): void {
    const selector = `.${WIDGET_CLASS_BASE}__chart-bar-used`;
    const element = document.querySelector(selector);

    if (!element || this.drive?.quota?.used === undefined) return;

    const usedInPercentage = this.drive.quota.getInPercentage().used || 0;
    const quotaAlmostReachedClass = `${WIDGET_CLASS_BASE}__chart-bar-used--reached`;

    (element as HTMLElement).style.width = `${usedInPercentage}%`;

    if (usedInPercentage >= WIDGET_QUOTA_ALMOST_REACHED_THRESHOLD_PERCENTAGE) {
      element.classList.add(quotaAlmostReachedClass);
    } else {
      element.classList.remove(quotaAlmostReachedClass);
    }
  }

  private updateDetails(): void {
    this.updateDetailsLimit();
    this.updateDetailsUsed();
    this.updateDetailsFree();
  }

  private updateDetailsLimit(): void {
    const selector = `.${WIDGET_CLASS_BASE}__details-limit-value`;
    const element = document.querySelector(selector);

    if (!element || this.drive?.quota?.limit === undefined) return;

    (element as HTMLElement).textContent = getSizeWithUnit(this.drive.quota.limit || 0, 2);
  }

  private updateDetailsUsed(): void {
    const selector = `.${WIDGET_CLASS_BASE}__details-used-value`;
    const element = document.querySelector(selector);

    if (!element || this.drive?.quota?.used === undefined) return;

    (element as HTMLElement).textContent = getSizeWithUnit(this.drive.quota.used || 0, 2);
  }

  private updateDetailsFree(): void {
    const selector = `.${WIDGET_CLASS_BASE}__details-free-value`;
    const element = document.querySelector(selector);

    if (!element || this.drive?.quota?.free == undefined) return;

    (element as HTMLElement).textContent = getSizeWithUnit(this.drive.quota.free || 0, 2);
  }

  private updateItems(): void {
    this.updateItemsHeadlineCount();
    this.updateItemList();
  }

  private updateItemsHeadlineCount(): void {
    const selector = `.${WIDGET_CLASS_BASE}__items-headline-count`;
    const element = document.querySelector(selector);

    if (!element || !this.drive?.data?.items) return;

    (element as HTMLElement).textContent = `#${Object.keys(this.drive.data.items).length}`;
  }

  private updateItemList(): void {
    const selector = `.${WIDGET_CLASS_BASE}__item-list`;
    const element = document.querySelector(selector);

    if (!element || !this.drive?.data?.items) return;

    element.innerHTML = '';
    this.drive.data.sortBySize();
    Object.keys(this.drive.data.items).forEach((key) => {
      element.appendChild(this.createItemListItem(key));
    });
  }

  private registerReloadClickEventListener(): void {
    const selector = `.${WIDGET_CLASS_BASE}__reload-icon`;
    const element = document.querySelector(selector);

    if (!element) return;

    element.addEventListener('click', () => {
      this.drive?.data?.refresh();
    });
  }
}
