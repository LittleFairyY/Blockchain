import { IPaginationParams } from '.';

export interface IAddressData {
  txid: string;
  from: string;
  to: string;
  amount: string;
  height: string;
  transtime: string;
  id: string;
}
export interface IAddressParams extends IPaginationParams {
  address: string;
}
