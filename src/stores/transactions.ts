import { action, observable } from 'mobx';
import {
  ITransactionData,
  IPaginationParams,
  IPaginationResponse,
  ISearchParams,
} from '../declares';
import { v4 as uuidv4 } from 'uuid';
import TransactionsServices from '../services/Transactions';

class Transactions {
  @observable transactionsList: ITransactionData[] = [];
  @observable totalCount: number = 0;
  @observable loading: boolean = false;
  @observable transactionDetail: ITransactionData = {
    amount: '0',
    from: '',
    to: '',
    txid: '',
    transtime: '',
    uuid: '',
  };

  @action.bound
  toggleLoading(loading: boolean = true) {
    this.loading = loading;
  }

  // 获取Transactionslist成功
  @action.bound
  getTransactionsListSuccess(res: IPaginationResponse<ITransactionData>) {
    this.totalCount = Number(res.totalcount);
    this.transactionsList = res.data.map(tx => ({
      ...tx,
      uuid: uuidv4(),
    }));
  }
  //获取Transactionslist
  @action.bound
  async getTransactionsList(params?: IPaginationParams) {
    const res = await TransactionsServices.getTransactionsList(params);
    return this.getTransactionsListSuccess(res);
  }
  @action.bound
  async getTxByBlock(params?: ISearchParams) {
    const res = await TransactionsServices.getTxByBlock(params);
    return this.getTransactionsListSuccess(res);
  }
  @action.bound
  getTransactionsDetailSuccess(res: ITransactionData[]) {
    this.transactionDetail = res[0];
    return Promise.resolve(res);
  }
  @action.bound
  async getTransactionsDetail(hash: string) {
    const res = await TransactionsServices.getTransactionsDetail(hash);
    return this.getTransactionsDetailSuccess(res);
  }
  @action.bound
  async getSearchHash(key: string) {
    const res = await TransactionsServices.getSearchHash(key);
    return Promise.resolve(res);
  }
}

export default Transactions;
export type ITransactionsStore = Transactions;
