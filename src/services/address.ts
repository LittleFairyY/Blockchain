import { IAddressData, IAddressParams, IPaginationResponse } from '../declares';
import { basicAxios } from '../utils/axios';
export default {
  // 获取节点列表列表
  getAddressList: (params?: IAddressParams) => {
    return basicAxios.get<
      IPaginationResponse<IAddressData>,
      IPaginationResponse<IAddressData>
    >('/GetAddressDetails.ashx', { params });
  },
};
