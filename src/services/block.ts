import {
  IBlockData,
  IPaginationParams,
  IPaginationResponse,
  IHomeInfo,
} from '../declares';
import { basicAxios } from '../utils/axios';
export default {
  // 获取节点列表列表
  getBlockList: (params?: IPaginationParams) => {
    return basicAxios.get<
      IPaginationResponse<IBlockData>,
      IPaginationResponse<IBlockData>
    >('/GetLatestBlocks.ashx', {
      params,
    });
  },
  getBlockDetail: (hash: string) => {
    return basicAxios.get<IBlockData[], IBlockData[]>('/GetBlockDetails.ashx', {
      params: { hash },
    });
  },
  getSupplyInfo: () => {
    return basicAxios.get<IHomeInfo[], IHomeInfo[]>('/GetSupplyInfo.ashx');
  },
};
