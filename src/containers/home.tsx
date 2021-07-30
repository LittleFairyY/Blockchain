import { Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import BlocksTranscations from '../components/home/blocks-transactions';
import { IBlockStore, ITransactionsStore } from '../stores';
import getFixedValue from '../utils/getFixedValue';
import toThousands from '../utils/toThousands';

const blocksIcon = require('../styles/images/imgs/Shape@2x.png');
const list = require('../styles/images/imgs/Transcations.png');
const jyl = require('../styles/images/imgs/jyl.png');
const fxl = require('../styles/images/imgs/fxl.png');
const dzs = require('../styles/images/imgs/das.png');
const logoIcon = require('../styles/images/imgs/IBR icon@2x.png');

export enum ContentType {
  Blocks = 'Blocks',
  Transcations = 'Transcations',
}

export enum DetailType {
  Address = 'address',
  Holders = 'holders',
}

interface IState {
  pageSize: number;
  pageIndex: number;
}

interface IProps extends RouteComponentProps, WithNamespaces {
  transactions: ITransactionsStore;
  block: IBlockStore;
}

@inject('transactions', 'block')
@observer
class Home extends React.Component<IProps, IState> {
  timer: any;

  state = {
    pageSize: 10,
    pageIndex: 1,
  };
  componentDidMount() {
    const { transactions, block } = this.props;
    transactions.getTransactionsList({ pageIndex: 1, pageSize: 10 });
    block.getBlockList({ pageIndex: 1, pageSize: 10 });
    block.getSupplyInfo();
  }

  render() {
    const {
      t,
      block: { homeInfo },
    } = this.props;
    return (
      <div className="page-home">
        <div className="home-detail">
          <div className="home-detail-left">
            <div className="left-header">
              <img src={logoIcon} alt="" /> ETH
            </div>
            <div className="left-data">
              <span>$3.42342</span>
              <span>+12.30%</span>
            </div>
            <div className="left-info">
              <div className="left-info-item">
                <span>{t('home_detail_left')}:</span>
                <span>$1,010,556,676.74</span>
              </div>
              <div className="left-info-item">
                <span>{t('home_detail_left_24')}:</span>
                <span>$423454</span>
              </div>
            </div>
          </div>
          <div className="home-detail-right">
            <div className="right-header pc-only">
              <div className="right-header-item">
                <img src={jyl} alt="" />
                <div className="right-header-item-info">
                  <div className="right-header-item-info-title">
                    {t('home_transactions_title')}
                  </div>
                  <div className="right-header-item-info-title">
                    {toThousands(getFixedValue(homeInfo.txcount, 2, false))}
                  </div>
                  <div className="right-header-item-info-data">
                    {toThousands(getFixedValue(homeInfo.tps, 2, false))} TPS
                  </div>
                </div>
              </div>
              <div className="right-header-item">
                <img src={fxl} alt="" />
                <div className="right-header-item-info">
                  <div className="right-header-item-info-title">
                    {t('home_supply_title')}
                  </div>
                  <div className="right-header-item-info-title">
                    {toThousands(getFixedValue(homeInfo.minedtotal, 2, false))}
                  </div>
                  <div className="right-header-item-info-data">MAX:1,000</div>
                </div>
              </div>
              <div className="right-header-item">
                <img src={dzs} alt="" />
                <div className="right-header-item-info">
                  <div className="right-header-item-info-title">
                    {t('home_address_title')}
                  </div>
                  <div className="right-header-item-info-title">
                    {toThousands(getFixedValue(homeInfo.addrcount, 2, false))}
                  </div>
                  <div className="right-header-item-info-data">
                    {toThousands(getFixedValue(homeInfo.nodecount, 2, false))}{' '}
                    SuperNodes
                  </div>
                </div>
              </div>
            </div>
            <div className="right-header mobile-only">
              <div className="right-header-item">
                <div className="right-header-item-info">
                  <div className="right-header-header">
                    <img src={fxl} alt="" />
                    <div className="right-header-item-info-title">
                      {t('home_supply_title')}
                    </div>
                  </div>
                  <div className="right-header-item-info-title">
                    {toThousands(getFixedValue(homeInfo.txcount, 2, false))}
                  </div>
                  <div className="right-header-item-info-data">
                    {toThousands(getFixedValue(homeInfo.tps, 2, false))} TPS
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="right-header-item">
                  <div className="right-header-item-info">
                    <div className="right-header-header">
                      <img src={jyl} alt="" />
                      <div className="right-header-item-info-title">
                        {t('home_transactions_title')}
                      </div>
                    </div>
                    <div className="right-header-item-info-title">
                      {toThousands(
                        getFixedValue(homeInfo.minedtotal, 2, false),
                      )}
                    </div>
                    <div className="right-header-item-info-data">MAX:1,000</div>
                  </div>
                </div>
                <div className="right-header-item">
                  <div className="right-header-item-info">
                    <div className="right-header-header">
                      <img src={dzs} alt="" />
                      <div className="right-header-item-info-title">
                        {t('home_address_title')}
                      </div>
                    </div>
                    <div className="right-header-item-info-title">
                      {toThousands(getFixedValue(homeInfo.addrcount, 2, false))}
                    </div>
                    <div className="right-header-item-info-data">
                      {toThousands(getFixedValue(homeInfo.nodecount, 2, false))}{' '}
                      SuperNodes
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="right-circulating">
                <div className="right-circulating-title">
                  {t('home_circulating_title')}
                </div>
                <div className="right-circulating-data">
                  {toThousands(getFixedValue(homeInfo.circutotal, 2, false))}
                </div>
              </div>
              <div className="right-frozen">
                <div className="right-circulating-title">
                  <span>{t('home_frozen_title')}</span>
                  <span>{t('destroyed')}</span>
                </div>
                <div className="right-frozen-data">
                  <div className="right-frozen-data-left">
                    {toThousands(getFixedValue(homeInfo.freezetotal, 2, false))}
                  </div>
                  <div className="right-frozen-data-right">
                    {toThousands(
                      getFixedValue(homeInfo.destroytotal || 0, 2, false),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row gutter={20} className="blocks-transactions-row">
          <Col span={12}>
            <BlocksTranscations
              contentType={ContentType.Blocks}
              icon={blocksIcon}
              dataSource={this.props.block.blockList}
            />
          </Col>
          <Col span={12}>
            <BlocksTranscations
              contentType={ContentType.Transcations}
              icon={list}
              dataSource={this.props.transactions.transactionsList}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(Home);
