export interface IBlockData {
  //节点列表的数据类型
  height: string;
  sec: string;
  nodename: string;
  txcount: string;
  uuid: string;
  time: string;
  reward: string;
  prev_hash?: string;
  reward_money?: string;
  blockhash?: string;
}
export interface IHomeInfo {
  id: string;
  minedtotal: string;
  txcount: string;
  tps: string;
  addrcount: string;
  nodecount: string;
  freezetotal: string;
  destroytotal: string;
  circutotal: string;
}
