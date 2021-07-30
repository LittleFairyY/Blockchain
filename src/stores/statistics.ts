import { action, observable } from 'mobx';
import { IStatisticsData } from '../declares';
import statisticsServices from '../services/Statistics';

class Statistics {
  @observable statisticsList: IStatisticsData[] = [];
  @observable totalCount: number = 0;
  @observable loading: boolean = false;

  @action.bound
  toggleLoading(loading: boolean = true) {
    this.loading = loading;
  }
  //获取Statisticslist
  @action.bound
  async getStatisticsList(type?: string) {
    const res = await statisticsServices.getStatisticsList(type);
    return Promise.resolve(res);
  }
}

export default Statistics;
export type IStatisticsStore = Statistics;
