import * as React from 'react';
import { Layout } from 'antd';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

const { Content } = Layout;

interface IProps extends RouteComponentProps {
  children: React.ReactChild;
}

@inject()
@observer
class Home extends React.Component<IProps> {
  render() {
    const { children } = this.props;
    return (
      <Layout className="home-layout">
        <Content>
          <div className="container">{children}</div>
        </Content>
      </Layout>
    );
  }
}

export default Home;
