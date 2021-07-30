import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../node_modules/antd/dist/antd.less';
import Container from './containers';
import i18n, { I18nLanguages } from './i18n';
import { auth } from './stores';
import './styles/index.styl';

const renderDom = async () => {
  if (i18n.language === 'zh-CN') {
    await auth.changeLanguage(I18nLanguages.English);
  }
  ReactDOM.render(<Container />, document.getElementById('app'));
};

renderDom();

if (process.env.NODE_ENV !== 'production') {
  if ((module as any).hot) {
    (module as any).hot.accept();
  }
}
