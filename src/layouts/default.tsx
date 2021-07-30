import { Layout, ConfigProvider } from 'antd';
import enUS from 'antd/es/locale-provider/en_US';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import Footer from '../components/common/footer';
import Header from '../components/common/header';
import { I18nLanguages } from '../i18n';
import { IAuthStore } from '../stores';

const { Content } = Layout;

interface IProps extends RouteComponentProps, WithNamespaces {
  routes: any[];
  auth: IAuthStore;
  children: React.ReactChild;
}

interface IState {
  collapsed: boolean;
  search: string;
}

@inject('auth')
@observer
class Default extends React.Component<IProps, IState> {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = this.props.t('common_title');
  }

  componentWillReceiveProps(prevProps: IProps) {
    if (prevProps.lng !== this.props.lng) {
      document.title = this.props.t('common_title');
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const { children, t, auth } = this.props;
    return (
      <Layout
        className={
          auth.openMenu ? 'default-layout min-height' : 'default-layout'
        }
      >
        <Content>
          <Header auth={auth} />
          <ConfigProvider
            locale={t('language') === I18nLanguages.Chinese ? zhCN : enUS}
          >
            <div className="container">{children}</div>
          </ConfigProvider>
          <Footer />
        </Content>
      </Layout>
    );
  }
}

export default withNamespaces()(Default);
