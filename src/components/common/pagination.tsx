import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'antd';

interface IProps extends RouteComponentProps, WithNamespaces {
  total: number;
  pageSize: number;
  currentPage: number;
  disabled?: boolean;
  onChange: (page: number) => void;
}

export enum Paging {
  First = 'first',
  Prev = 'previous-page',
  Next = 'next-page',
  Last = 'last',
}
const leftIcon = require('../../styles/images/imgs/left-icon.png');
const leftIcon2 = require('../../styles/images/imgs/left-icon-dis.png');
const rightIcon = require('../../styles/images/imgs/right-icon.png');
const rightIcon2 = require('../../styles/images/imgs/right-icon-dis.png');

class Pagination extends React.PureComponent<IProps> {
  pageChangeHandler = (pageType: Paging) => () => {
    window.scrollTo(0, 0);
    const { pageSize, onChange, total, currentPage } = this.props;
    switch (pageType) {
      case Paging.First:
        onChange(1);
        break;
      case Paging.Prev:
        onChange(currentPage - 1);
        break;
      case Paging.Next:
        onChange(currentPage + 1);
        break;
      case Paging.Last:
        const newCurrentPage = Math.ceil(total / pageSize);
        onChange(newCurrentPage);
        break;
      default:
    }
  };
  render() {
    const { currentPage, total, pageSize, disabled, t } = this.props;
    return (
      <div>
        {total > pageSize && (
          <div className="pagination">
            <div className="group-left">
              <Button
                className="page-btn"
                onClick={this.pageChangeHandler(Paging.First)}
                disabled={disabled || currentPage === 1}
              >
                {t('first')}
              </Button>
              <div className="line" />
              <Button
                className="page-btn"
                onClick={this.pageChangeHandler(Paging.Prev)}
                disabled={disabled || currentPage === 1}
              >
                <img
                  src={disabled || currentPage === 1 ? leftIcon2 : leftIcon}
                />
              </Button>
            </div>
            <span className="page-info">
              {currentPage}/{Math.ceil(total / pageSize)}
            </span>
            <div className="group-right">
              <Button
                className="page-btn"
                onClick={this.pageChangeHandler(Paging.Next)}
                disabled={
                  disabled || currentPage === Math.ceil(total / pageSize)
                }
              >
                <img
                  src={
                    disabled || currentPage === Math.ceil(total / pageSize)
                      ? rightIcon2
                      : rightIcon
                  }
                />
              </Button>
              <div className="line" />
              <Button
                className="page-btn"
                onClick={this.pageChangeHandler(Paging.Last)}
                disabled={
                  disabled || currentPage === Math.ceil(total / pageSize)
                }
              >
                {t('last')}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withNamespaces()(withRouter(Pagination));
