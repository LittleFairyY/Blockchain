import { action, observable } from 'mobx';
import { IAddressData, IAddressParams, IPaginationResponse } from '../declares';
import { v4 as uuidv4 } from 'uuid';
import addressServices from '../services/address';

class Address {
  @observable addressList: IAddressData[] = [];
  @observable totalCount: number = 0;
  @observable freeze: number = 0;
  @observable address: string = '';
  @observable balance: number = 0;
  @observable loading: boolean = false;

  @action.bound
  toggleLoading(loading: boolean = true) {
    this.loading = loading;
  }

  // 获取Addresslist成功
  @action.bound
  getAddressListSuccess(res: IPaginationResponse<IAddressData>) {
    this.totalCount = Number(res.totalcount);
    this.freeze = res.freeze ? Number(res.freeze) : 0;
    this.balance = res.balance ? Number(res.balance) : 0;
    this.address = res.address ? res.address : '';
    this.addressList = res.data
      ? res.data.map(tx => ({
        ...tx,
        uuid: uuidv4(),
      }))
      : [];
    return Promise.resolve(res);
  }
  //获取Addresslist
  @action.bound
  async getAddressList(params?: IAddressParams) {
    const res = await addressServices.getAddressList(params);
    return this.getAddressListSuccess(res);
  }
}

export default Address;
export type IAddressStore = Address;
