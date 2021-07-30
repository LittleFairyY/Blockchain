import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import Pagination from '../components/common/pagination';
import TableList from '../components/common/table-list';
import { ClientType } from '../declares';
import { IBlockStore } from '../stores';
import getClient from '../utils/get-client';

const listIcon = require('../styles/images/imgs/qbqk.png');
interface IState {
  pageIndex: number;
  pageSize: number;
  disabled: boolean;
}

interface IProps extends RouteComponentProps, WithNamespaces {
  block: IBlockStore;
}

@inject('block')
@observer
class BlockList extends React.Component<IProps, IState> {
  state = {
    pageIndex: 1,
    pageSize: 10,
    disabled: false,
  };
  componentDidMount() {
    const { pageIndex, pageSize } = this.state;
    this.getData(pageIndex, pageSize);
  }
  getData(pageIndex: number, pageSize?: number) {
    const { toggleLoading, getBlockList } = this.props.block;
    toggleLoading(true);
    getBlockList({
      pageIndex,
      pageSize: pageSize ? pageSize : 10,
    }).finally(() => {
      toggleLoading(false);
    });
  }
  onChangePage = async (pageIndex: number) => {
    await this.setState({ pageIndex });
    this.getData(pageIndex);
  };

  getColumns() {
    const { t } = this.props;
    const isMobile = getClient() === ClientType.Mobile;
    const columns = [
      {
        title: t('height'),
        dataIndex: 'height',
        key: 'height',
        width: !isMobile ? 150 : 100,
        className: 'td-color',
      },
      {
        title: t('time'),
        dataIndex: 'time',
        key: 'time',
        width: !isMobile ? 200 : 170,
      },
      // {
      //   title: t('age'),
      //   dataIndex: 'sec',
      //   align: 'center',
      //   width: 130,
      // },
      {
        title: t('txns'),
        dataIndex: 'txcount',
        key: 'txns',
        width: !isMobile ? 260 : 150,
        className: 'td-color',
      },
      {
        title: t('miner'),
        dataIndex: 'nodename',
        key: 'txCount',
        width: 80,
        className: 'td-color',
      },
      {
        title: t('block_reward'),
        dataIndex: 'bounty',
        key: 'bounty',
        align: 'right',
      },
    ];
    return columns;
  }

  render() {
    const { t, block } = this.props;
    const { disabled } = this.state;

    return (
      <div>
        <div className="transaction-list-content block-list">
          <div className="blocks-title">
            <div className="list-icon">
              <img src={listIcon} />
              {t('home_blocks')}
            </div>
            <div className="pagination-top pc-table">
              <Pagination
                onChange={this.onChangePage}
                total={block.totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.pageIndex}
                disabled={disabled}
              />
            </div>
          </div>
          <TableList
            data={block.blockList}
            columns={this.getColumns()}
            loading={block.loading}
          />
          <div className="mobile-table">
            <Pagination
              onChange={this.onChangePage}
              total={block.totalCount / this.state.pageSize}
              pageSize={this.state.pageSize}
              currentPage={this.state.pageIndex}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(BlockList);
