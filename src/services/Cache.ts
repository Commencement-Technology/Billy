import {MMKV} from 'react-native-mmkv';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {Bill} from '../models/Bill';

export enum STORAGE_KEYS {
  LAST_SYNC_DATE = 'lastSyncDate',
  BILLS = 'bills',
  USER_ID = 'userId',
}
class Cache {
  private storage;
  constructor() {
    this.storage = new MMKV();
    if (__DEV__) {
      initializeMMKVFlipper({default: this.storage});
    }
  }

  getStorage() {
    return this.storage;
  }

  getLastSyncDate(): string | undefined {
    return this.storage.getString(STORAGE_KEYS.LAST_SYNC_DATE);
  }

  setLastSyncDate(date: string): void {
    this.storage.set(STORAGE_KEYS.LAST_SYNC_DATE, date);
  }

  setLastSyncDateAsNow(): void {
    this.setLastSyncDate(JSON.stringify(new Date()));
  }

  getBills(): string | undefined {
    return this.storage.getString(STORAGE_KEYS.BILLS);
  }

  setBills(bills: Partial<Bill>[]): void {
    this.storage.set(STORAGE_KEYS.BILLS, JSON.stringify(bills));
  }

  getUserId(): string | undefined {
    return this.storage.getString(STORAGE_KEYS.USER_ID);
  }

  setUserId(userId: string): void {
    this.storage.set(STORAGE_KEYS.USER_ID, userId);
  }
}

export default new Cache();