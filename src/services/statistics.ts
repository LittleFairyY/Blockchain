import { IStatisticsData } from '../declares';
import { basicAxios } from '../utils/axios';
export default {
  // 获取节点列表列表
  getStatisticsList: (type?: string) => {
    return basicAxios.get<IStatisticsData, IStatisticsData>(
      '/GetRankStat.ashx',
      { params: { type } },
    );
  },
};
