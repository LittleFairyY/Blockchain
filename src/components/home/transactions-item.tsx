import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { ITransactionData } from '../../declares';
import getFixedValue from '../../utils/getFixedValue';
import toThousands from '../../utils/toThousands';
interface IProps extends WithNamespaces {
  goToBlockDetail: (item: ITransactionData) => void;
  itemData: ITransactionData;
}

class TransactionsItem extends React.Component<IProps> {
  goToBlockDetail = () => {
    const { goToBlockDetail, itemData } = this.props;
    goToBlockDetail(itemData);
  };

  render() {
    const { t, itemData } = this.props;

    return (
      <div className="block-content-item">
        <div>
          <div className="item-info">
            <div>
              <span className="item-label">Tx</span>
              <span
                className="item-wrapper item-transactions"
                style={{ cursor: 'pointer' }}
                onClick={this.goToBlockDetail}
              >
                {itemData.txid}
              </span>
            </div>
            <div style={{ color: '#33333', fontSize: '14px' }}>
              {toThousands(getFixedValue(itemData.amount, 6, false))}<span style={{ color: '#999', marginLeft: '5px' }}>IBR</span>
            </div>
          </div>
          <div className="item-bottom">
            <div className="item-right">
              {t('from')}:<span>{itemData.from}</span>
            </div>
            <div className="item-right">
              {t('to')}: <span>{itemData.to}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(TransactionsItem);
