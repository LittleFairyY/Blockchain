import { AxiosResponse } from 'axios';
import i18n from '../i18n';

const errStr: { [key: string]: string } = {
  error_SYS0001: i18n.t('error_SYS0001'),
  error_SYS0002: i18n.t('error_SYS0002'),
  error_SYS0004: i18n.t('error_SYS0004'),
  error_unknown: i18n.t('error_unknown'),
};

export interface IAPIError {
  code: string;
  message: string;
  status: number;
  url?: string;
}

export const getError = (response: AxiosResponse): IAPIError => {
  const code = (!!response && response.data && response.data.code) || 'unknown';
  let errCode;
  let message;
  errCode = `error_${code}`;
  message = errStr[errCode] || response.data.message || errCode;
  const status = !!response ? response.status : -1;
  const url = !!response ? response.config.url : '/';

  return {
    code,
    message,
    status,
    url,
  };
};
