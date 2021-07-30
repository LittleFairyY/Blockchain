import {
  ITransactionData,
  IPaginationParams,
  IPaginationResponse,
  ISearchItem,
  ISearchParams,
} from '../declares';
import { basicAxios } from '../utils/axios';
export default {
  // 获取节点列表列表
  getTransactionsList: (params?: IPaginationParams) => {
    return basicAxios.get<
      IPaginationResponse<ITransactionData>,
      IPaginationResponse<ITransactionData>
    >('/GetLatestTx.ashx', {
      params,
    });
  },
  getTransactionsDetail: (txid: string) => {
    return basicAxios.get<ITransactionData[], ITransactionData[]>(
      '/GetTransDetails.ashx',
      {
        params: { txid },
      },
    );
  },
  getTxByBlock: (params?: ISearchParams) => {
    return basicAxios.get<
      IPaginationResponse<ITransactionData>,
      IPaginationResponse<ITransactionData>
    >('/GetBlockTx.ashx', { params });
  },
  getSearchHash: (key: string) => {
    return basicAxios.get<ISearchItem[], ISearchItem[]>('/GetSearchInfo.ashx', {
      params: { key },
    });
  },
};
