import { Col, Form, Row, Tooltip } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { DetailType } from '../../containers/home';
import { ClientType, IForkInfoData } from '../../declares';
import { I18nLanguages } from '../../i18n';
import getClient from '../../utils/get-client';

const blocksIcon = require('../../styles/images/img_branch.svg');
const pieIcon = require('../../styles/images/img-pie.svg');
const FormItem = Form.Item;

interface IProps extends WithNamespaces, RouteComponentProps {
  forkInfo: IForkInfoData;
  goToDetails: (type: DetailType, owner?: string) => () => void;
  showHalveCycle?: boolean;
  masterSymbol: string;
  isPrimary: boolean;
}

class BranchInfo extends React.Component<IProps> {
  renderBottomItemWithHalveCycle = () => {
    const { t, forkInfo, goToDetails, masterSymbol } = this.props;
    const isMobile = getClient() === ClientType.Mobile;
    return (
      <>
        <Row>
          <Col span={8}>
            <FormItem label={t('home_half_life')}>
              {forkInfo.halveCycle}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label={t('home_mortgage_tokens')}>
              {`${forkInfo.mortgage} ${masterSymbol}`}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              className="blue-font"
              label={t('home_holders', { symbol: forkInfo.symbol })}
            >
              <div
                onClick={goToDetails(DetailType.Holders)}
                className="holders"
              >
                {forkInfo.addressCount} <img src={pieIcon} />
              </div>
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label={t('home_remains_mortgage_tokens')}>
              <Tooltip
                overlayClassName="halve-cycle-tooltip"
                placement="top"
                title={t('home_mortgage_tokens_tooltip')}
                trigger={isMobile ? 'click' : 'hover'}
              >
                <span className="halve-cycle-text-decoration">
                  {`${forkInfo.frozenCoins} ${masterSymbol}`}
                </span>
              </Tooltip>
            </FormItem>
          </Col>
        </Row>
      </>
    );
  };

  renderBottomItemNoHalveCycle = () => {
    const { t, forkInfo, goToDetails, masterSymbol } = this.props;
    return (
      <>
        <Row>
          <Col span={8}>
            <FormItem label={t('home_mortgage_tokens')}>
              {`${forkInfo.mortgage} ${masterSymbol}`}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label={t('home_remains_mortgage_tokens')}>
              {`${forkInfo.frozenCoins} ${masterSymbol}`}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              className="blue-font"
              label={t('home_holders', { symbol: forkInfo.symbol })}
            >
              <div
                onClick={goToDetails(DetailType.Holders)}
                className="holders"
              >
                {forkInfo.addressCount} <img src={pieIcon} />
              </div>
            </FormItem>
          </Col>
          <Col span={16}>
            {/* {isPrimary ? (
              <FormItem
                className="blue-font"
                label={t('bbc_address_amount', { symbol: forkInfo.symbol })}
              >
                {forkInfo.addressCountTotal}
              </FormItem>
            ) : null} */}
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const { t, forkInfo, goToDetails, showHalveCycle } = this.props;
    const labelCol = t!('language') === I18nLanguages.Chinese ? 8 : 12;
    const formItemLayout = {
      labelCol: { span: labelCol },
      wrapperCol: { span: 24 - labelCol },
      colon: false,
    };
    const isMobile = getClient() === ClientType.Mobile;

    return (
      <div className="home-branch-info">
        <div className="blocks-title">
          <img src={blocksIcon} />
          {t('home_branch_information')}
        </div>
        <Form {...formItemLayout}>
          <Row>
            <Col span={8}>
              <FormItem className="fork-name" label={t('home_branch')}>
                {forkInfo.name}
              </FormItem>
            </Col>
            <Col
              span={16}
              onClick={goToDetails(DetailType.Address, forkInfo.owner)}
            >
              <FormItem
                className="blue-font full-width"
                label={t('home_owner')}
              >
                {forkInfo.owner}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label={t('home_parent_branch')}>
                {forkInfo.parentName || t('home_parent_branch_no')}
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem
                label={t('home_parent_branch_id')}
                className={classnames({
                  'full-width': !!forkInfo.parent,
                })}
              >
                {forkInfo.parent || t('home_parent_branch_no')}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                label={t(
                  !!forkInfo.halveCycle
                    ? 'home_estimated_total_supply'
                    : 'home_total_supply',
                )}
              >
                {!!forkInfo.halveCycle ? (
                  <Tooltip
                    overlayClassName="halve-cycle-tooltip"
                    placement="top"
                    title={t('home_estimated_total_tooltip')}
                    trigger={isMobile ? 'click' : 'hover'}
                  >
                    <span className="halve-cycle-text-decoration">
                      {/* {getFixedValue(forkInfo.total, 6, true)} */}
                    </span>
                  </Tooltip>
                ) : (
                  0
                )}
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem label={t('home_token_in_circulation')}>
                {/* {getFixedValue(forkInfo.circulation, 6, true)} */}
              </FormItem>
            </Col>
          </Row>
          {!showHalveCycle
            ? this.renderBottomItemWithHalveCycle()
            : this.renderBottomItemNoHalveCycle()}
        </Form>
      </div>
    );
  }
}

export default withNamespaces()(withRouter(BranchInfo));
