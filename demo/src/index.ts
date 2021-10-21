import { StorageMonitor } from '@dafcoe/storage-monitor';
import './index.scss';

new StorageMonitor();

const generateRandomItemValue = () => Array.from(Array(Math.floor(Math.random() * 100000) + 1).keys()).join('');

document.querySelector('#add-button')?.addEventListener('click', () => {
  localStorage.setItem(Date.now().toString(), generateRandomItemValue());
});

document.querySelector('#remove-button')?.addEventListener('click', () => {
  const storageKeys = Object.keys(localStorage);
  const key = storageKeys[Math.floor(Math.random() * storageKeys.length)];

  localStorage.removeItem(key);
});

document.querySelector('#clear-button')?.addEventListener('click', () => {
  localStorage.clear();
});
