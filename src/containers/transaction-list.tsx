import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import Pagination from '../components/common/pagination';
import TableList from '../components/common/table-list';
import { ITransactionsStore } from '../stores';
import getFixedValue from '../utils/getFixedValue';
import toThousands from '../utils/toThousands';

const listIcon = require('../styles/images/imgs/Transcations.png');

interface IState {
  pageSize: number;
  pageIndex: number;
  disabled: boolean;
}

interface IProps extends RouteComponentProps, WithNamespaces {
  transactions: ITransactionsStore;
}

@inject('transactions')
@observer
class TransactionList extends React.Component<IProps, IState> {
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
    const {
      transactions: { toggleLoading, getTransactionsList, getTxByBlock },
      history,
    } = this.props;
    toggleLoading(true);

    if (history.location.state && history.location.state.height) {
      getTxByBlock({
        height: history.location.state.height,
        pageIndex,
        pageSize: pageSize ? pageSize : 10,
      }).finally(() => {
        toggleLoading(false);
      });
    } else {
      getTransactionsList({
        pageIndex,
        pageSize: pageSize ? pageSize : 10,
      }).finally(() => {
        toggleLoading(false);
      });
    }
  }
  goTransaction = (txid: string) => () => {
    this.props.history.push(`/transaction-detail`, { txid });
  };

  goAddressDetail = (address: string) => () => {
    this.props.history.push(`/address-detail/${address}`);
  };

  goBlockDetail = (height: string) => () => {
    this.props.history.push(`/block-detail`, { hash: height });
  };

  onChangePage = async (pageIndex: number) => {
    await this.setState({ pageIndex });
    this.getData(pageIndex);
  };
  getColumns() {
    const { t } = this.props;
    const columns = [
      {
        title: t('txn_hash'),
        dataIndex: 'txid',
        width: 310,
        className: 'td-color',
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 310,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: (text: string) => (
          <span className="text-hidden" onClick={this.goTransaction(text)}>
            {text}
          </span>
        ),
      },
      {
        title: t('home_blocks_item'),
        dataIndex: 'height',
        key: 'height',
        className: 'td-color',
        render: (text: string | null) => (
          <span
            className="text-hidden"
            onClick={this.goBlockDetail(text || '')}
          >
            {text}
          </span>
        ),
      },
      {
        title: t('time'),
        dataIndex: 'time',
        key: 'time',
        width: 180,
      },
      {
        title: t('form'),
        dataIndex: 'from',
        key: 'from',
        width: 200,
        className: 'td-color',
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: (text: string | null) => (
          <span
            className="text-hidden"
            onClick={this.goAddressDetail(text || '')}
          >
            {text}
          </span>
        ),
      },
      {
        title: t('to'),
        dataIndex: 'to',
        key: 'to',
        width: 200,
        className: 'td-color',
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: (text: string | null) => (
          <span
            className="text-hidden"
            onClick={this.goAddressDetail(text || '')}
          >
            {text}
          </span>
        ),
      },
      {
        title: t('value'),
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        className: 'td-color',
        render: (text: string) => (
          <div>{toThousands(getFixedValue(text, 6, false))} IBR</div>
        ),
      },
    ];
    return columns;
  }
  render() {
    const {
      t,
      transactions: { transactionsList, totalCount, loading },
      history,
    } = this.props;
    const { disabled } = this.state;

    return (
      <div>
        <div className="transaction-list-content">
          <div className="blocks-title">
            <div className="list-icon">
              <img src={listIcon} />
              {t('home_transactions_title')}
              {/* 交易列表显示全部交易不显示到时候可以直接家判断 */}
              {history.location.state && history.location.state.height ? (
                <span className="transaction-list-font">
                  For Block #{history.location.state.height}{' '}
                  {history.location.state.txcount} {t('transactions_time')}
                </span>
              ) : null}
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
              data={transactionsList}
              columns={this.getColumns()}
              loading={loading}
              rowKey="uuid"
            />
          </div>
          <div className="mobile-table mobile-transaction-table">
            <TableList
              data={transactionsList}
              columns={this.getColumns()}
              rowKey="uuid"
            />
            <Pagination
              onChange={this.onChangePage}
              total={totalCount}
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

export default withNamespaces()(TransactionList);
