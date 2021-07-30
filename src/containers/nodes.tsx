import Pagination from '../components/common/pagination';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import TableList from '../components/common/table-list';
import { INodeData } from '../declares';
import { INodeStore } from '../stores';

const listIcon = require('../styles/images/imgs/node.png');
const rank1 = require('../styles/images/imgs/1@2x.png');
const rank2 = require('../styles/images/imgs/2@2x.png');
const rank3 = require('../styles/images/imgs/3@2x.png');
const group = require('../styles/images/imgs/Group 5@2x.png');

interface IProps extends WithNamespaces, RouteComponentProps {
  node: INodeStore;
}

interface IState {
  pageSize: number;
  pageIndex: number;
  disabled: boolean;
}
@inject('node')
@observer
class Nodes extends React.Component<IProps, IState> {
  state = {
    pageSize: 10,
    pageIndex: 1,
    disabled: false,
  };
  componentDidMount() {
    const { pageIndex, pageSize } = this.state;
    this.getData(pageIndex, pageSize);
  }
  getData(pageIndex: number, pageSize?: number) {
    const { toggleLoading, getNodeList } = this.props.node;
    toggleLoading(true);
    getNodeList({
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
  goAddressDetail = (address: string) => () => {
    this.props.history.push(`/address-detail/${address}`);
  };

  // goBlockDetail = (height: string) => () => {
  //   this.props.history.push(`/block-detail`, { hash: height });
  // };
  renderRank = (index: number) => {
    switch (index) {
      case 0:
        return <img className="table-rank" src={rank1} />;
      case 1:
        return <img className="table-rank" src={rank2} />;
      case 2:
        return <img className="table-rank" src={rank3} />;
      default:
        return <div className="table-rank-other">{index + 1}</div>
    }
  };
  getColumns() {
    const { t } = this.props;
    return [
      {
        title: t('node_table_rank'),
        width: 80,
        key: 'id',
        align: 'center',
        render: (_: string, __: INodeData, index: number) => this.renderRank(index),
      },
      {
        title: t('node_table_name_tag'),
        dataIndex: 'nodename',
        key: 'nodename',
        align: 'center',
      },
      {
        title: t('home_address_title'),
        dataIndex: 'address',
        key: 'address',
        className: 'td-color',
        width: 397,
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 397,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: (text: string) => (
          <span className="text-hidden" onClick={this.goAddressDetail(text)}>
            {text}
          </span>
        ),
      },
      {
        title: t('node_table_supported'),
        dataIndex: 'votercount',
        align: 'left',
      },
      {
        title: t('balance'),
        dataIndex: 'amount',
        align: 'left',
      },
      {
        title: t('mined'),
        dataIndex: 'totalcount',
        align: 'right',
      },
    ];
  }
  render() {
    const {
      t,
      node: { nodeList, totalCount, loading },
    } = this.props;
    const { disabled } = this.state;
    return (
      <div className="node">
        <div className="transaction-list-content node-list-content">
          <div className="blocks-title">
            <div className="list-icon">
              <img src={listIcon} />
              {t('home_node_nav')}
            </div>
            <div className="pagination-top pc-table">
              <Pagination
                onChange={this.onChangePage}
                total={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.pageIndex}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="pc-table">
            <TableList
              data={nodeList}
              loading={loading}
              columns={this.getColumns()}
              rowKey="id"
            />
          </div>
          <div className="mobile-table">
            <TableList
              data={nodeList}
              columns={this.getColumns()}
              loading={loading}
              rowKey="id"
            />
            <div className="pagination-top">
              <Pagination
                onChange={this.onChangePage}
                total={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.pageIndex}
                disabled={this.state.disabled}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Nodes);
