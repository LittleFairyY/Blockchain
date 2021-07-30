import * as moment from 'moment';

const dateFormat = (
  time: number,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string => {
  const utcOffset = moment()
    .parseZone()
    .utcOffset();
  return moment(time ? time * 1000 : undefined)
    .utcOffset(utcOffset)
    .format(format);
};

export default dateFormat;
