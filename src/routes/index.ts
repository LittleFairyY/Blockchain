import * as Loadable from 'react-loadable';
import Loading from '../components/common/loading';

const Main = Loadable({
  loader: () => import('../containers/home'),
  loading: Loading,
});
const BlockList = Loadable({
  loader: () => import('../containers/block-list'),
  loading: Loading,
});
const BlockDetail = Loadable({
  loader: () => import('../containers/block-detail'),
  loading: Loading,
});
const TransactionList = Loadable({
  loader: () => import('../containers/transaction-list'),
  loading: Loading,
});
const TransactionDetail = Loadable({
  loader: () => import('../containers/transaction-detail'),
  loading: Loading,
});
const AddressDetail = Loadable({
  loader: () => import('../containers/address-detail'),
  loading: Loading,
});
const Statistics = Loadable({
  loader: () => import('../containers/statistics'),
  loading: Loading,
});
const Nodes = Loadable({
  loader: () => import('../containers/nodes'),
  loading: Loading,
});
const SearchResult = Loadable({
  loader: () => import('../containers/search-result'),
  loading: Loading,
});

const routes = [
  {
    name: 'index',
    path: '/',
    title: '首页',
    component: Main,
    menuIgnore: true,
  },
  {
    name: 'index',
    path: '/home',
    title: '首页',
    component: Main,
    menuIgnore: true,
  },
  {
    name: 'block-list',
    path: '/block-list',
    // path: '/block-list/:forkHash',
    title: '区块列表',
    component: BlockList,
    menuIgnore: true,
  },
  {
    name: 'block-detail',
    path: '/block-detail',
    // path: '/block-detail/:hash',
    title: '区块明细信息',
    component: BlockDetail,
    menuIgnore: true,
  },
  {
    name: 'transaction-list',
    path: '/transaction-list',
    // path: '/transaction-list/:forkHash',
    title: '交易列表',
    component: TransactionList,
    menuIgnore: true,
  },
  {
    name: 'transaction-detail',
    path: '/transaction-detail',
    // path: '/transaction-detail/:hash',
    title: '交易明细',
    component: TransactionDetail,
    menuIgnore: true,
  },
  {
    name: 'address-detail',
    // path: '/address-detail',
    path: '/address-detail/:address',
    title: '地址明细',
    component: AddressDetail,
    menuIgnore: true,
  },
  {
    name: 'nodes',
    path: '/nodes',
    title: '数据',
    component: Nodes,
    menuIgnore: true,
  },
  {
    name: 'statistics',
    path: '/statistics',
    title: '分支',
    component: Statistics,
    menuIgnore: true,
  },
  {
    name: '/search-result',
    path: '/search-result',
    title: '搜索结果页',
    component: SearchResult,
    menuIgnore: true,
  },
];

export default routes;
