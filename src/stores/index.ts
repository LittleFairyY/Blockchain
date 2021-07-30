import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';

import Auth from './auth';
import Node from './node';
import Block from './block';
import Address from './address';
import Statistics from './statistics';
import Transactions from './transactions';

configure({ enforceActions: 'observed' });

if (process.env.NODE_ENV !== 'production') {
  enableLogging({
    action: true,
    reaction: false,
    transaction: false,
    compute: false,
    predicate: () => true,
  });
}

export const auth = new Auth();
export const node = new Node();
export const block = new Block();
export const address = new Address();
export const statistics = new Statistics();
export const transactions = new Transactions();

export * from './auth';
export * from './node';
export * from './block';
export * from './address';
export * from './statistics';
export * from './transactions';
