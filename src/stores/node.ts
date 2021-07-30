import { action, observable } from 'mobx';
import { INodeData, IPaginationParams, IPaginationResponse } from '../declares';
import NodeServices from '../services/Node';

class Node {
  @observable nodeList: INodeData[] = [];
  @observable totalCount: number = 0;
  @observable loading: boolean = false;

  @action.bound
  toggleLoading(loading: boolean = true) {
    this.loading = loading;
  }

  // 获取Nodelist成功
  @action.bound
  getNodeListSuccess(res: IPaginationResponse<INodeData>) {
    this.totalCount = Number(res.totalcount);
    this.nodeList = res.data;
  }
  //获取Nodelist
  @action.bound
  async getNodeList(params?: IPaginationParams) {
    const res = await NodeServices.getNodeList(params);
    return this.getNodeListSuccess(res);
  }
}

export default Node;
export type INodeStore = Node;
