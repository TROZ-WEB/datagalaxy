import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from './types';

export const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<StoreModel>();
