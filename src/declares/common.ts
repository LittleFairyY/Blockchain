export interface IPaginationParams {
  pageIndex: number;
  pageSize?: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  totalcount: string;
  address?: string;
  balance?: string;
  freeze?: string;
}
/**
 * 设备类型
 */
export enum ClientType {
  Mobile = 'mobile',
  Web = 'web',
}
