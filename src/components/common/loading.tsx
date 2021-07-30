import * as React from 'react';
import * as Loadable from 'react-loadable';

class Loading extends React.PureComponent<Loadable.LoadingComponentProps> {
  render() {
    return <h1>Loading...</h1>;
  }
}

export default Loading;
