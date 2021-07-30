import { action, observable } from 'mobx';
import {
  IBlockData,
  IHomeInfo,
  IPaginationParams,
  IPaginationResponse,
} from '../declares';
import { v4 as uuidv4 } from 'uuid';
import blockServices from '../services/block';

class Block {
  getTransactionsList(arg0: { pageIndex: number; pageSize: number }) {
    throw new Error('Method not implemented.');
  }
  @observable blockList: IBlockData[] = [];
  @observable totalCount: number = 0;
  @observable loading: boolean = false;
  @observable blockDetail: IBlockData = {
    height: '',
    sec: '',
    nodename: '',
    txcount: '',
    uuid: '',
    time: '',
    reward: '',
  };
  @observable homeInfo: IHomeInfo = {
    id: '',
    minedtotal: '0',
    txcount: '0',
    tps: '0',
    addrcount: '0',
    nodecount: '0',
    freezetotal: '0',
    destroytotal: '0',
    circutotal: '0',
  };
  @action.bound
  toggleLoading(loading: boolean = true) {
    this.loading = loading;
  }

  // 获取Blocklist成功
  @action.bound
  getBlockListSuccess(res: IPaginationResponse<IBlockData>) {
    this.totalCount = Number(res.totalcount);
    this.blockList = res.data.map(tx => ({
      ...tx,
      uuid: uuidv4(),
    }));
  }
  //获取Blocklist
  @action.bound
  async getBlockList(params?: IPaginationParams) {
    const res = await blockServices.getBlockList(params);
    return this.getBlockListSuccess(res);
  }
  @action.bound
  getBlockDetailSuccess(res: IBlockData[]) {
    this.blockDetail = res[0];
    return Promise.resolve(res);
  }
  @action.bound
  async getBlockDetail(hash: string) {
    const res = await blockServices.getBlockDetail(hash);
    return this.getBlockDetailSuccess(res);
  }
  @action.bound
  getSupplyInfoSuccess(res: IHomeInfo[]) {
    this.homeInfo = res[0];
  }
  @action.bound
  async getSupplyInfo() {
    const res = await blockServices.getSupplyInfo();
    return this.getSupplyInfoSuccess(res);
  }
}

export default Block;
export type IBlockStore = Block;
