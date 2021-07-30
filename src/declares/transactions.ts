import { IPaginationParams } from ".";

export interface ITransactionData {
  //节点列表的数据类型
  amount: string;
  from: string;
  to: string;
  txid: string;
  uuid: string;
  data?: string;
  fee?: string;
  height?: string;
  transtime?: string;
}
export interface ISearchItem {
  key: string;
  type: string;
}
export interface ISearchParams extends IPaginationParams {
  height: string;
}
