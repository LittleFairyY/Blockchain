import { message, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import Pagination from '../components/common/pagination';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import TableList from '../components/common/table-list';
import { IAddressStore } from '../stores/address';
import toThousands from '../utils/toThousands';
import getFixedValue from '../utils/getFixedValue';
import { ClientType } from '../declares';
import getClient from '../utils/get-client';

const listIcon = require('../styles/images/imgs/Transcations.png');
const addressIcon = require('../styles/images/imgs/add@2x.png');
const copyIcon = require('../styles/images/imgs/copy.png');

const Clipboard = require('clipboard');

interface IProps extends RouteComponentProps, WithNamespaces {
  address: IAddressStore;
}
interface IState {
  pageSize: number;
  pageIndex: number;
  disabled: boolean;
}

@inject('address')
@observer
class AddressDetail extends React.Component<IProps, IState> {
  clipboard: any;
  constructor(props: any) {
    super(props);
    this.clipboard = new Clipboard('.copy-btn');
    this.state = {
      pageSize: 10,
      pageIndex: 1,
      disabled: false,
    };
  }

  componentDidMount() {
    this.clipboard.on('success', (e: any) => {
      message.destroy();
      message.success(this.props.t!('copy_success'));
      e.clearSelection();
    });
    const { pageIndex, pageSize } = this.state;
    this.getData(pageIndex, pageSize);
  }
  getData(pageIndex: number, pageSize?: number) {
    const {
      address: { toggleLoading, getAddressList },
      history,
      match,
    } = this.props;
    toggleLoading(true);
    getAddressList({
      pageIndex,
      address: match.params.address,
      pageSize: pageSize ? pageSize : 10,
    })
      .then(res => {
        if (!res.data) {
          history.push('/search-result');
        }
      })
      .finally(() => {
        toggleLoading(false);
      });
  }
  componentDidUpdate(nextProps: IProps) {
    const newParamsAddress = (nextProps.match.params as any).address;
    const paramsAddress = (this.props.match.params as any).address;
    if (newParamsAddress !== paramsAddress) {
      this.getData(1);
    }
  }
  onChangePage = async (pageIndex: number) => {
    await this.setState({ pageIndex });
    this.getData(pageIndex);
  };
  goAddressDetail = (address: string) => () => {
    this.props.history.push(`/address-detail/${address}`);
  };

  goTransaction = (txid: string) => () => {
    this.props.history.push(`/transaction-detail`, { txid });
  };
  goBlock = (hash: string) => () => {
    this.props.history.push(`/block-detail`, { hash });
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
        render: (text: string) => (
          <span className="text-hidden" onClick={this.goBlock(text)}>
            {text}
          </span>
        ),
      },
      {
        title: t('age'),
        dataIndex: 'transtime',
        key: 'time',
        width: 180,
      },
      {
        title: t('from'),
        dataIndex: 'from',
        key: 'from',
        width: 160,
        className: 'td-color',
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 160,
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
        title: t('to'),
        dataIndex: 'to',
        key: 'to',
        width: 160,
        className: 'td-color',
        onCell: () => {
          return {
            style: {
              whiteSpace: 'nowrap',
              maxWidth: 160,
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
        title: t('value'),
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        className: 'td-color',
        render: (text: string) => (
          <div>{toThousands(getFixedValue(text, 6, false))} BST</div>
        ),
      },
    ];
    return columns;
  }
  setAddress = (str: string) => {
    return `${str.slice(0, 10)}...${str.substring(str.length - 10)}`;
  };
  render() {
    const {
      t,
      address: { addressList, loading, totalCount, freeze, balance, address },
    } = this.props;
    const isMobile = getClient() === ClientType.Mobile;

    return (
      <div className="address-detail">
        <Spin spinning={loading}>
          <div className="transaction-list-content">
            <div className="blocks-title">
              <div className="list-icon">
                <img src={addressIcon} />
                {t('address_information')}
              </div>
            </div>
            <div className="transaction-detail-info">
              <div className="info-line">
                <span className="leable">{t('home_address_title')}</span>
                <span className="td-color">
                  <span className="code-text">
                    {!isMobile ? address : this.setAddress(address)}
                  </span>
                  <img
                    src={copyIcon}
                    data-clipboard-target=".code-text"
                    className="copy-btn"
                  />
                </span>
              </div>
              <div className="info-line pc-only">
                <div>
                  <span className="leable">{t('balance')}</span>
                  <span>
                    {toThousands(getFixedValue(balance, 6, false))} BST
                  </span>
                </div>
                <div>
                  <span className="leable">{t('freezing')}</span>
                  <span>
                    {toThousands(getFixedValue(freeze, 6, false))} BST
                  </span>
                </div>
              </div>
              <div className="mobile-only">
                <div className="info-line">
                  <div>
                    <span className="leable">{t('balance')}</span>
                    <span>
                      {toThousands(getFixedValue(balance, 6, false))} BST
                    </span>
                  </div>
                </div>
                <div className="info-line">
                  <div>
                    <span className="leable">{t('freezing')}</span>
                    <span>
                      {toThousands(getFixedValue(freeze, 6, false))} BST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
        <div className="transaction-list-content">
          <div className="blocks-title">
            <div className="list-icon">
              <img src={listIcon} />
              {t('home_transactions_title')}
            </div>
            <div className="pagination-top pc-table">
              <Pagination
                onChange={this.onChangePage}
                total={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.pageIndex}
                disabled={this.state.disabled}
              />
            </div>
          </div>
          <TableList
            data={addressList}
            columns={this.getColumns()}
            loading={loading}
            rowKey="uuid"
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
    );
  }
}

export default withNamespaces()(AddressDetail);
