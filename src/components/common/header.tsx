import { AutoComplete, Button, Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { I18nLanguages } from '../../i18n';
import { IAuthStore, ITransactionsStore } from '../../stores';
// const logo = require('../../styles/images/logo.svg');
const searchIcon = require('../../styles/images/imgs/search.png');
const arrowButtom = require('../../styles/images/imgs/arrowButtom.png');
const home = require('../../styles/images/imgs/home@2x.png');
const home1 = require('../../styles/images/imgs/home1@2x.png');
const node = require('../../styles/images/imgs/Nodes@2x.png');
const node1 = require('../../styles/images/imgs/Nodes1@2x.png');
const statistics = require('../../styles/images/imgs/Statistics@2x.png');
const statistics1 = require('../../styles/images/imgs/Statistics1@2x.png');
const menuIcon = require('../../styles/images/imgs/menu.png');
const closeIcon = require('../../styles/images/imgs/close.png');
const langItcon = require('../../styles/images/imgs/lang.png');
const logoIcon = require('../../styles/images/imgs/IBR icon@2x.png');

interface IProps extends RouteComponentProps, WithNamespaces {
  auth: IAuthStore;
  transactions: ITransactionsStore;
}
const { Option } = AutoComplete;

interface IState {
  open: boolean;
  searchText: string;
  currentPathName: string;
}
@inject('auth', 'transactions')
@observer
class Header extends React.Component<IProps, IState> {
  state = {
    result: [
      // { value: 'fork', text: 'common_search_fork' },
      { value: 'addr', text: 'common_search_address' },
      { value: 'tx', text: 'common_search_txhash' },
      { value: 'block', text: 'common_search_block' },
    ],
    open: false,
    searchText: '',
    currentPathName: '',
  };
  componentDidMount() {
    if (this.props.history.location.pathname === '/') {
      this.setState({ currentPathName: 'home' });
    } else if (this.props.history.location.pathname.indexOf('nodes') !== -1) {
      this.setState({ currentPathName: 'nodes' });
    } else if (
      this.props.history.location.pathname.indexOf('statistics') !== -1
    ) {
      this.setState({ currentPathName: 'statistics' });
    }
  }
  handleSearch = (value: string) => {
    this.setState({ searchText: value });
  };
  toggleMenu = () => {
    this.props.auth.setOpenMenu(!this.props.auth.openMenu);
  };
  changeLanguage = (lang: I18nLanguages) => () => {
    this.toggleMenu();
    const { auth } = this.props;
    auth.changeLanguage(lang);
  };

  onChange = (val: string) => () => {
    const { history, transactions } = this.props;
    const { searchText } = this.state;
    transactions.getSearchHash(searchText).then(res => {
      if (
        res.some(item => item.key !== '') &&
        res.find(item => item.type === val)
      ) {
        const value = res.find(item => item.type === val)!.key;
        switch (val) {
          case 'addr':
            history.push(`/address-detail/${value}`);
            return;
          case 'tx':
            history.push(`/transaction-detail`, { txid: value });
            return;
          case 'block':
            history.push(`/block-detail`, { hash: value });
            return;
          default:
            return;
        }
      }
      return history.push('/search-result');

    });
  };
  render() {
    const { result, searchText } = this.state;
    const { t } = this.props;
    const children: any = result.map(item => (
      <Option key={item.value}>
        <div onClick={this.onChange(item.value)}>
          <div className="search-title">{t(item.text)}</div>
          <p className="search-content">{searchText}</p>
        </div>
      </Option>
    ));
    const menu = (
      <Menu>
        <Menu.Item onClick={this.changeLanguage(I18nLanguages.English)}>
          English
        </Menu.Item>
        <Menu.Item onClick={this.changeLanguage(I18nLanguages.Chinese)}>
          简体中文
        </Menu.Item>
        {/* <Menu.Item onClick={this.changeLanguage(I18nLanguages.KP)}>
          한국어
        </Menu.Item>
        <Menu.Item onClick={this.changeLanguage(I18nLanguages.JP)}>
          日本語
        </Menu.Item> */}
      </Menu>
    );
    return (
      <div>
        <div className="header">
          <div className="header-inside">
            <div className="logo-box">
              <div className="logo">
                <img src={logoIcon} alt="" />
              </div>
              <span>Blockchain</span>
            </div>
            <div className="search-bar">
              <AutoComplete
                style={{ width: 200 }}
                onSearch={this.handleSearch}
                // onChange={this.onChange}
                value={searchText}
                placeholder={t('common_search_placeholder')}
              >
                {searchText ? children : null}
              </AutoComplete>
              <img src={searchIcon} className="search-icon" />
            </div>
            <div className="language">
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>
                  {t('language_name')}
                  <img src={arrowButtom} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="herder-nav pc-only">
          <Link
            to="/"
            className={classnames({
              activeLink: this.state.currentPathName === 'home',
            })}
          >
            <img
              src={this.state.currentPathName === 'home' ? home : home1}
              alt=""
            />
            <span>{t('home_home_nav')}</span>
          </Link>
          <Link
            to="/nodes"
            className={classnames({
              activeLink: this.state.currentPathName === 'nodes',
            })}
          >
            <img
              src={this.state.currentPathName === 'nodes' ? node : node1}
              alt=""
            />
            <span>{t('home_node_nav')}</span>
          </Link>
          <Link
            to="/statistics"
            className={classnames({
              activeLink: this.state.currentPathName === 'statistics',
            })}
          >
            <img
              src={
                this.state.currentPathName === 'statistics'
                  ? statistics
                  : statistics1
              }
              alt=""
            />
            <span>{t('home_statistics_nav')}</span>
          </Link>
        </div>
        <div className="header-mobile">
          <div className="header-mobile-inside">
            <div className="logo-box">
              <div className="logo">
                <img src={logoIcon} alt="" />
              </div>
              <span>Blockchain</span>
            </div>
            <div id="nav-icon" onClick={this.toggleMenu}>
              <img src={this.props.auth.openMenu ? closeIcon : menuIcon} />
            </div>
          </div>
          <div
            className={classnames('search-bar', {
              show: this.props.auth.openMenu,
            })}
          >
            <img src={searchIcon} className="search-icon" />
            <AutoComplete
              style={{ width: 200 }}
              onSearch={this.handleSearch}
              // onChange={this.onChange}
              value={searchText}
              placeholder={t('common_search_placeholder')}
            >
              {searchText ? children : null}
            </AutoComplete>
          </div>
          <div
            className={classnames('header-mobile-content', {
              open: this.props.auth.openMenu,
            })}
          >
            <div>
              <Link
                to="/"
                className={classnames({
                  activeLink: this.state.currentPathName === 'home',
                })}
              >
                <img
                  src={this.state.currentPathName === 'home' ? home : home1}
                  alt=""
                />
                <span>{t('home_home_nav')}</span>
              </Link>
              <Link
                to="/nodes"
                className={classnames({
                  activeLink: this.state.currentPathName === 'nodes',
                })}
              >
                <img
                  src={this.state.currentPathName === 'nodes' ? node : node1}
                  alt=""
                />
                <span>{t('home_node_nav')}</span>
              </Link>
              <Link
                to="/statistics"
                className={classnames({
                  activeLink: this.state.currentPathName === 'statistics',
                })}
              >
                <img
                  src={
                    this.state.currentPathName === 'statistics'
                      ? statistics
                      : statistics1
                  }
                  alt=""
                />
                <span>{t('home_statistics_nav')}</span>
              </Link>

              <a
                onClick={this.changeLanguage(I18nLanguages.Chinese)}
                className={classnames('lan cn', {
                  active: t('language') === I18nLanguages.Chinese,
                })}
              >
                <img src={langItcon} />
                简体中文
              </a>
              <a
                onClick={this.changeLanguage(I18nLanguages.English)}
                className={classnames('lan en', {
                  active: t('language') === I18nLanguages.English,
                })}
              >
                English
              </a>
              {/* <a
                onClick={this.changeLanguage(I18nLanguages.KP)}
                className={classnames('lan en', {
                  active: t('language') === I18nLanguages.KP,
                })}
              >
                한국어
              </a>
              <a
                onClick={this.changeLanguage(I18nLanguages.JP)}
                className={classnames('lan en', {
                  active: t('language') === I18nLanguages.JP,
                })}
              >
                日本語
              </a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(withRouter(Header));
