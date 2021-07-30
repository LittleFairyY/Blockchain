import { INodeData, IPaginationParams, IPaginationResponse } from '../declares';
import { basicAxios } from '../utils/axios';
export default {
  // 获取节点列表列表
  getNodeList: (params?: IPaginationParams) => {
    return basicAxios.get<
      IPaginationResponse<INodeData>,
      IPaginationResponse<INodeData>
    >('/GetVoteNodes.ashx', { params });
  },
};
