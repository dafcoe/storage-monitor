import { WIDGET_CLASS_BASE } from './storage-monitor.constant';

export const styles = `
  .${WIDGET_CLASS_BASE} {
    position: fixed;
    bottom: -172px;
    right: 0;
    z-index: 99999;
    padding: 6px;
    width: 180px;
    background-color: #333;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 12px;
    line-height: 1;
    color: #fff;
    transition: bottom .25s ease;
  }

  .${WIDGET_CLASS_BASE}:hover {
    bottom: 0;
  }

  .${WIDGET_CLASS_BASE}:hover .${WIDGET_CLASS_BASE}__reload-icon {
    display: inline-block;
  }

  .${WIDGET_CLASS_BASE} * {
    box-sizing: border-box;
  }

  .${WIDGET_CLASS_BASE} ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #f5f5f5;
  }

  .${WIDGET_CLASS_BASE} ::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  .${WIDGET_CLASS_BASE} ::-webkit-scrollbar-thumb {
    background-color: #333;
    border-left: 1px solid #aaa;
  }

  .${WIDGET_CLASS_BASE}__header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 6px 0;
    height: 13px;
    overflow: hidden;
  }

  .${WIDGET_CLASS_BASE}__headline {
    margin: 0;
    font-size: 12px;
  }

  .${WIDGET_CLASS_BASE}__reload-icon {
    display: none;
    color: #aaa;
    cursor: pointer;
    transition: color .25s ease;
  }

  .${WIDGET_CLASS_BASE}__reload-icon:hover {
    color: #fff;
  }

  .${WIDGET_CLASS_BASE}__reload-icon svg {
    height: 12px;
    width: 12px;
  }

  .${WIDGET_CLASS_BASE}__chart {
    margin-bottom: 10px;
    width: 100%;
  }

  .${WIDGET_CLASS_BASE}__chart-bar {
    position: relative;
    border: 1px solid #aaa;
    height: 10px;
  }

  .${WIDGET_CLASS_BASE}__chart-bar-limit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .${WIDGET_CLASS_BASE}__chart-bar-used {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .${WIDGET_CLASS_BASE}__chart-bar-limit {
    width: 100%;
    background-color: #555;
  }

  .${WIDGET_CLASS_BASE}__chart-bar-used {
    background-color: #0da5ff;
    transition: all .25s ease;
  }

  .${WIDGET_CLASS_BASE}__chart-bar-used--reached {
    background-color: #da0000;
  }

  .${WIDGET_CLASS_BASE}__details {
    margin-bottom: 10px;
    color: #aaa;
  }

  .${WIDGET_CLASS_BASE}__details-limit {
    display: flex;
    justify-content: space-between;
  }

  .${WIDGET_CLASS_BASE}__details-used {
    display: flex;
    justify-content: space-between;
  }

  .${WIDGET_CLASS_BASE}__details-free {
    display: flex;
    justify-content: space-between;
  }

  .${WIDGET_CLASS_BASE}__items-headline {
    display: flex;
    justify-content: space-between;
  }

  .${WIDGET_CLASS_BASE}__item-list {
    margin: 0;
    padding: 4px;
    border: 1px solid #aaa;
    background-color: #555;
    width: 100%;
    list-style: none;
    height: 104px;
    overflow: auto;
  }

  .${WIDGET_CLASS_BASE}__item-list-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }

  .${WIDGET_CLASS_BASE}__item-list-item:not(:last-of-type) {
    margin-bottom: 6px;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-bar-limit {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 2px;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-bar-used {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 2px;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-bar-limit {
    width: 100%;
    background-color: #333;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-bar-used {
    background-color: #0da5ff;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-key {
    z-index: 1;
    padding: 2px;
    white-space: nowrap;
    margin-right: 12px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .${WIDGET_CLASS_BASE}__item-list-item-used {
    z-index: 1;
    padding: 2px;
    white-space: nowrap;
    background-color: #333333;
  }
`;
