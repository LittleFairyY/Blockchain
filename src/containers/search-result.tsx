import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';

const notFound = require('../styles/images/imgs/no-data.png');

class SearchResult extends React.Component<WithNamespaces> {
  render() {
    return (
      <div className="search-result">
        <div className="holders-title">
          {/* <Search /> */}
          <div className="not-found">
            <img src={notFound} />
            <div>{this.props.t('common_search_notfound')}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(SearchResult);
