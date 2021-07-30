import { Table } from 'antd';
import classnames from 'classnames';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';

interface IProps extends RouteComponentProps, WithNamespaces {
  columns: any;
  data: any;
  extraClass?: string;
  rowKey?: string;
  onRow?: boolean;
  loading?: boolean;
}
class TableList extends React.Component<IProps> {
  static defaultProps = {
    rowKey: 'uuid',
    loading: false,
  };

  render() {
    const { extraClass, rowKey, onRow, t, loading } = this.props;
    return (
      <div
        className={classnames(
          'transaction-list-content-table',
          extraClass ? extraClass : '',
        )}
      >
        {onRow !== undefined ? (
          <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            pagination={false}
            rowKey={rowKey}
            locale={{ emptyText: t('NoData') }}
          />
        ) : (
          <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            pagination={false}
            rowKey={rowKey}
            loading={loading}
          />
        )}
      </div>
    );
  }
}

export default withNamespaces()(withRouter(TableList));
