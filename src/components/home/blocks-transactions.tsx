import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { ContentType } from '../../containers/home';
import { IBlockData, ITransactionData } from '../../declares';
import BlocksItem from './blocks-item';
import TransactionsItem from './transactions-item';

interface IProps extends WithNamespaces, RouteComponentProps {
  contentType: ContentType;
  icon: string;
  // forkHash: string;
  isMaster?: boolean;
  dataSource: IBlockData[] | ITransactionData[];
}

class BlocksTransactions extends React.Component<IProps> {
  goToList = () => {
    const { contentType, history } = this.props;
    if (contentType === ContentType.Blocks) {
      return history.push(`/block-list`);
    }
    return history.push(`/transaction-list`);
  };
  goToTanxList = () => {
    return this.props.history.push(`/transaction-list`);
  };
  goToBlockDetail = (item: any) => {
    const { contentType, history } = this.props;
    if (contentType === ContentType.Blocks) {
      return history.push(`/block-detail`, { hash: item.height });
    }
    return history.push(`/transaction-detail`, { txid: item.txid });
  };

  render() {
    const { t, contentType, icon, dataSource } = this.props;
    return (
      <div className="home-blocks-transactions">
        <div className="blocks-transactions-title">
          <div className="list-icon">
            <img src={icon} />
            {contentType === ContentType.Blocks
              ? t('home_blocks')
              : t('home_transactions')}
          </div>
          <span
            className="view-all"
            onClick={this.goToList}
            tabIndex={0}
            role="button"
          >
            {t('home_view_all')}
          </span>
        </div>
        {!!dataSource.length ? (
          <div className="blocks-transactions-content">
            {contentType === ContentType.Blocks
              ? dataSource.map((item) => (
                <BlocksItem
                  key={item.uuid}
                  goToBlockDetail={this.goToBlockDetail}
                  goToTranList={this.goToTanxList}
                  itemData={item}
                />
              ))
              : dataSource.map((item) => (
                <TransactionsItem
                  key={item.uuid}
                  goToBlockDetail={this.goToBlockDetail}
                  itemData={item}
                />
              ),
              )}
          </div>
        ) : (
          <div className="blocks-transactions-nodata">
            {contentType === ContentType.Blocks
              ? t('home_nodata_block')
              : t('home_nodata_transactions')}
          </div>
        )}
      </div>
    );
  }
}

export default withNamespaces()(withRouter(BlocksTransactions));
