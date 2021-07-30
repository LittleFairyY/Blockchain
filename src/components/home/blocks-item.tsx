import { observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { IBlockData } from '../../declares';

interface IProps extends WithNamespaces {
  goToBlockDetail: (item: IBlockData) => void;
  goToTranList: () => void;
  itemData: IBlockData;
}

@observer
class BlocksItem extends React.Component<IProps> {
  goToBlockDetail = () => {
    const { goToBlockDetail, itemData } = this.props;
    goToBlockDetail(itemData);
  };
  setTime(num: number) {
    if (num < 60) {
      return this.props.t('sec', { num });
    } else if (num > 60 && num < 360) {
      return this.props.t('min', { num: Math.floor(num / 60) });
    } else {
      return this.props.t('hours', { num: Math.floor(num / 60 / 60) });
    }
  }
  render() {
    const { t, itemData, goToTranList } = this.props;
    return (
      <div className="block-content-item">
        <div>
          <div className="item-info">
            <div>
              <span className="item-label">{`${t('home_blocks_item')}`}</span>
              <span
                className="item-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={this.goToBlockDetail}
              >
                #{itemData.height}
              </span>
            </div>
            <div className="item-right">{itemData.nodename}</div>
          </div>
          <div className="item-bottom">
            <div className="item-right">
              {this.setTime(itemData.sec ? Number(itemData.sec) : 0)}
            </div>
            <div>
              <span className="item-label">{t('home_block_includes')}</span>
              <span
                className="item-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={goToTranList}
              >
                {itemData.txcount} Txns
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(BlocksItem);
