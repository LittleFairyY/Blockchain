import { Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { IBlockStore } from '../stores';
const listIcon = require('../styles/images/imgs/Transcations.png');

interface IProps extends RouteComponentProps, WithNamespaces {
  block: IBlockStore;
}

@inject('block')
@observer
class BlockDetail extends React.Component<IProps> {
  componentDidMount() {
    const { history, block } = this.props;
    block.toggleLoading(true);
    block
      .getBlockDetail(history.location.state.hash)
      .then(res => {
        if (!res.length) {
          history.push('/search-result');
        }
      })
      .finally(() => {
        block.toggleLoading(false);
      });
  }
  goToTrans = () => {
    this.props.history.push('/transaction-list', {
      height: this.props.block.blockDetail.height,
      txcount: this.props.block.blockDetail.txcount,
    });
  };
  goBlockDetail = () => {
    const { block, history } = this.props;
    history.push(`/block-detail`, {
      hash: block.blockDetail ? block.blockDetail.height : '',
    });
  };
  render() {
    const { t, block } = this.props;
    return (
      <div className="transaction" style={{ height: '647px' }}>
        <Spin spinning={block.loading}>
          <div className="transaction-list-content">
            <div className="blocks-title">
              <div>
                <img src={listIcon} />
                {t('block_info')}
                <span className="mobile-height">
                  #{block.blockDetail && block.blockDetail.height}
                </span>
              </div>
            </div>
            <div className="transaction-detail-info">
              <div className="info-line">
                <span className="leable">{t('block_height')}</span>
                <span onClick={this.goBlockDetail}>
                  #{block.blockDetail && block.blockDetail.height}
                </span>
              </div>
              <div className="info-line">
                <span className="leable">{t('timestamp')}</span>
                <span>{block.blockDetail && block.blockDetail.time}</span>
              </div>
              <div className="info-line">
                <span className="leable">{t('home_transactions_title')}</span>
                <span className="td-color" onClick={this.goToTrans}>
                  {block.blockDetail && block.blockDetail.txcount}{' '}
                  {t('transactions_time')}
                </span>
              </div>
              <div className="info-line">
                <span className="leable">{t('block_hash')}</span>
                <span>{block.blockDetail && block.blockDetail.blockhash}</span>
              </div>
              <div className="info-line">
                <span className="leable">{t('parent_hash')}</span>
                <span className="td-color">
                  {block.blockDetail && block.blockDetail.prev_hash}
                </span>
              </div>
              <div className="info-line">
                <span className="leable">{t('mined_by')}</span>
                <span>{block.blockDetail && block.blockDetail.nodename}</span>
              </div>
              <div className="info-line">
                <span className="leable">{t('block_reward')}</span>
                <span>
                  {block.blockDetail && block.blockDetail.reward_money} IBR
              </span>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default withNamespaces()(BlockDetail);
