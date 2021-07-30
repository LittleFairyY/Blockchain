import { ClientType } from '../declares';

const getClient = () => {
  if (
    document.body.clientWidth < 768 &&
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    )
  ) {
    // Mobile
    return ClientType.Mobile;
  }
  // Web
  return ClientType.Web;
};

export default getClient;
