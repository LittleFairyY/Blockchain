import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { message } from 'antd';
import { ITransactionsStore } from '../stores';
import getFixedValue from '../utils/getFixedValue';
import toThousands from '../utils/toThousands';
import getClient from '../utils/get-client';
import { ClientType } from '../declares';
const listIcon = require('../styles/images/imgs/Transcations.png');
const copyIcon = require('../styles/images/imgs/copy.png');

const Clipboard = require('clipboard');

interface IProps extends RouteComponentProps, WithNamespaces {
  transactions: ITransactionsStore;
}

@inject('transactions')
@observer
class TransactionDetail extends React.Component<IProps> {
  clipboard: any;
  clipboard2: any;
  clipboard3: any;
  constructor(props: any) {
    super(props);
    this.clipboard = new Clipboard('.copy-btn');
    this.clipboard2 = new Clipboard('.copy-btn2');
    this.clipboard3 = new Clipboard('.copy-btn3');
    this.state = {
      googleCode: '',
      qrcode: '',
      secret: '',
    };
  }
  componentDidMount() {
    const { transactions, history } = this.props;
    this.clipboard.on('success', (e: any) => {
      message.destroy();
      message.success(this.props.t!('copy_success'));
      e.clearSelection();
    });
    this.clipboard2.on('success', (e: any) => {
      message.destroy();
      message.success(this.props.t!('copy_success'));
      e.clearSelection();
    });
    this.clipboard3.on('success', (e: any) => {
      message.destroy();
      message.success(this.props.t!('copy_success'));
      e.clearSelection();
    });
    transactions
      .getTransactionsDetail(history.location.state.txid)
      .then(res => {
        if (!res.length) {
          history.push('/search-result');
        }
      })
      .finally(() => {
        transactions.toggleLoading(false);
      });
  }
  setAddress = (str: string) => {
    return `${str.slice(0, 10)}...${str.substring(str.length - 10)}`;
  };
  goAddressDetail = (address: string) => () => {
    this.props.history.push(`/address-detail/${address}`);
  };
  goBlockDetail = (hash: string) => () => {
    this.props.history.push(`/block-detail`, { hash });
  };
  render() {
    const { t, transactions } = this.props;
    const isMobile = getClient() === ClientType.Mobile;
    return (
      <div className="transaction">
        <div className="transaction-list-content">
          <div className="blocks-title">
            <div>
              <img src={listIcon} />
              {t('transaction_info')}
            </div>
          </div>
          <div className="transaction-detail-info">
            <div className="info-line">
              <span className="leable">{t('tx_hash')}</span>
              <span className="td-color">
                <span className="code-text txid-text">
                  {transactions.transactionDetail &&
                    transactions.transactionDetail.txid}
                </span>
                <img
                  src={copyIcon}
                  data-clipboard-target=".code-text"
                  className="copy-btn txid-copy"
                />
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('block_height')}</span>
              <span
                className="td-color"
                onClick={this.goBlockDetail(
                  transactions.transactionDetail.height || ''
                )}
              >
                #{transactions.transactionDetail &&
                  transactions.transactionDetail.height}
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('timestamp')}</span>
              <span>
                {transactions.transactionDetail &&
                  transactions.transactionDetail.transtime}{' '}
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('from')}</span>
              <span className="td-color">
                <span
                  className="code-text2"
                  onClick={this.goAddressDetail(
                    transactions.transactionDetail &&
                    transactions.transactionDetail.from,
                  )}
                >
                  {!isMobile
                    ? transactions.transactionDetail &&
                    transactions.transactionDetail.from
                    : transactions.transactionDetail &&
                    this.setAddress(transactions.transactionDetail.from)}
                </span>
                <img
                  src={copyIcon}
                  data-clipboard-target=".code-text2"
                  className="copy-btn3"
                />
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('to')}</span>
              <span className="td-color">
                <span
                  className="code-text3"
                  onClick={this.goAddressDetail(
                    transactions.transactionDetail &&
                    transactions.transactionDetail.to,
                  )}
                >
                  {!isMobile
                    ? transactions.transactionDetail &&
                    transactions.transactionDetail.to
                    : transactions.transactionDetail &&
                    this.setAddress(transactions.transactionDetail.to)}
                </span>
                <img
                  src={copyIcon}
                  data-clipboard-target=".code-text3"
                  className="copy-btn3"
                />
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('value')}</span>
              <span>
                {toThousands(
                  getFixedValue(
                    transactions.transactionDetail &&
                    Number(transactions.transactionDetail.amount),
                    4,
                    false,
                  ),
                )}{' '}
                IBR
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('transaction_fee')}</span>
              <span>
                {toThousands(
                  getFixedValue(
                    transactions.transactionDetail &&
                    Number(transactions.transactionDetail.fee),
                    4,
                    false,
                  ),
                )}{' '}
                IBR
              </span>
            </div>
            <div className="info-line">
              <span className="leable">{t('date')}</span>
              <span>
                {toThousands(
                  getFixedValue(
                    transactions.transactionDetail &&
                    Number(transactions.transactionDetail.data),
                    4,
                    false,
                  ),
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(TransactionDetail);
