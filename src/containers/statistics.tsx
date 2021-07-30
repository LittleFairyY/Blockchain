import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import TableList from '../components/common/table-list';
import { ClientType } from '../declares';
import { IStatisticsStore } from '../stores';
import getClient from '../utils/get-client';
import getFixedValue from '../utils/getFixedValue';
import toThousands from '../utils/toThousands';

const listIcon = require('../styles/images/imgs/portfolio@2x.png');
const listIcon2 = require('../styles/images/imgs/dj.png');
const listIcon3 = require('../styles/images/imgs/fq.png');
const listIcon4 = require('../styles/images/imgs/js.png');
const rank1 = require('../styles/images/imgs/1@2x.png');
const rank2 = require('../styles/images/imgs/2@2x.png');
const rank3 = require('../styles/images/imgs/3@2x.png');

interface IProps extends RouteComponentProps, WithNamespaces {
  statistics: IStatisticsStore;
}

@inject('statistics')
@observer
class Statistics extends React.Component<IProps> {
  state = {
    balanceList: [],
    sendList: [],
    freezeList: [],
    receiveList: [],
  };

  componentDidMount() {
    const { getStatisticsList } = this.props.statistics;
    Promise.all([
      getStatisticsList('balance'),
      getStatisticsList('freeze'),
      getStatisticsList('send'),
      getStatisticsList('receive'),
    ]).then(res => {
      this.setState({
        balanceList: res[0],
        freezeList: res[1],
        sendList: res[2],
        receiveList: res[3],
      });
    });
  }
  goAddressDetail = (address: string) => () => {
    this.props.history.push(`/address-detail/${address}`);
  };

  renderRank = (index: number) => {
    switch (index) {
      case 0:
        return <img className="table-rank" src={rank1} />;
      case 1:
        return <img className="table-rank" src={rank2} />;
      case 2:
        return <img className="table-rank" src={rank3} />;
      default:
        return <div className="table-rank-other">{index + 1}</div>;
    }
  };
  getColumns() {
    const { t } = this.props;
    const isMobile = getClient() === ClientType.Mobile;
    return [
      {
        title: t('node_table_rank'),
        width: 70,
        key: 'id',
        render: (_: string, __: any, index: number) => this.renderRank(index),
      },
      {
        title: t('home_address_title'),
        dataIndex: 'address',
        width: isMobile ? 240 : 346,
        className: 'td-color',
        align: isMobile ? 'left' : 'center',
        render: (text: string) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={this.goAddressDetail(text)}
          >
            {text}
          </div>
        ),
      },
      {
        title: t('total_amount'),
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text: string) => (
          <div>{toThousands(getFixedValue(text || 0, 6, false))}</div>
        ),
      },
    ];
  }
  render() {
    const { t } = this.props;
    const { receiveList, sendList, balanceList, freezeList } = this.state;
    return (
      <div className="branch-list">
        <div className="table-row">
          <div className="table-item">
            <div className="transaction-list-content">
              <div className="blocks-title">
                <div className="list-icon">
                  <img src={listIcon} />
                  {t('top_holding')}
                </div>
              </div>
              <div>
                <TableList
                  data={balanceList}
                  columns={this.getColumns()}
                  loading={false}
                  rowKey="uuid"
                />
              </div>
            </div>
          </div>
          <div className="table-item">
            <div className="transaction-list-content">
              <div className="blocks-title">
                <div className="list-icon">
                  <img src={listIcon2} />
                  {t('top_freezing')}
                </div>
              </div>
              <div>
                <TableList
                  data={freezeList}
                  columns={this.getColumns()}
                  loading={false}
                  rowKey="uuid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-row">
          <div className="table-item">
            <div className="transaction-list-content">
              <div className="blocks-title">
                <div className="list-icon">
                  <img src={listIcon3} />
                  {t('top_sender')}
                </div>
              </div>
              <div>
                <TableList
                  data={sendList}
                  columns={this.getColumns()}
                  loading={false}
                  rowKey="uuid"
                />
              </div>
            </div>
          </div>
          <div className="table-item">
            <div className="transaction-list-content">
              <div className="blocks-title">
                <div className="list-icon">
                  <img src={listIcon4} />
                  {t('top_receiver')}
                </div>
              </div>
              <div>
                <TableList
                  data={receiveList}
                  columns={this.getColumns()}
                  loading={false}
                  rowKey="uuid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Statistics);
