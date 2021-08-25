/* eslint-disable import/prefer-default-export */
import { action } from 'easy-peasy';

const setState: any = action((state, payload) => ({ ...state, ...payload }));

export { setState };
