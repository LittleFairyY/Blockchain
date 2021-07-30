import routes from '../routes';
import { IMenuKeysProps } from '../components/common/drawer';

export const getDefaultMenuObj = () => {
  const firstMenuObj = routes.filter(
    route => !route.menuIgnore && route.subRoutes,
  )[0];
  const o: IMenuKeysProps = {
    groupKey: firstMenuObj.name,
    menuKey: firstMenuObj.subRoutes![0].path,
  };
  return o;
};
