import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import * as stores from '../stores';
import flatten from '../utils/flatten';
import routes from '../routes';
import { Default } from '../layouts';

interface IProps extends RouteComponentProps { }
class App extends React.Component<IProps> {
  render() {
    return (
      <Switch>
        {flatten(routes, 'subRoutes')
          .filter(route => route.path)
          .map(({ component: Component, layout: Layout, ...rest }) => {
            const renderHandler = (props: any) => {
              return Layout ? (
                <Layout {...props} routes={routes}>
                  <Component {...props} />
                </Layout>
              ) : (
                <Default {...props} routes={routes}>
                  <Component {...props} />
                </Default>
              );
            };
            return (
              <Route exact key={rest.path} {...rest} render={renderHandler} />
            );
          })}
        <Redirect from="/" to="/home" />
      </Switch>
    );
  }
}

const MainApp = withRouter(App);

const Container = () => (
  <I18nextProvider i18n={i18n}>
    <MobxProvider {...stores}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </MobxProvider>
  </I18nextProvider>
);

export default Container;
