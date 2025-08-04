import { getItem, setItem } from '@/lib/storage/helpers';
import { type Pin } from '@/types/pin';

const store = 'settings';

export const getPins = () => getItem<Pin[]>(store);
export const writePins = (value: Pin[]) => setItem<Pin[]>(store, value);
