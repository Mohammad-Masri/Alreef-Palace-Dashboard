import moment from 'moment';

export const convertDateToFormatDate = (data) => {
  if (!data) return null;
  return moment.utc(data).format('YYYY-MM-DD').toString();
};

export const convertDateToFormatDateAndTime = (data) => {
  if (data == null || data == '') return '';
  return moment.utc(data).format('YYYY-MM-DD HH:mm:ss a').toString();
};

export const getNowMonthHelper = () => {
  return moment().format('YYYY-MM').toString();
};

export const getFirstDayOfThisMonth = (month) => {
  return moment(month).startOf('month').format('YYYY-MM-DD').toString();
};

export const getLastDayOfThisMonth = (month) => {
  return moment(month).endOf('month').format('YYYY-MM-DD').toString();
};

export const getStartTimeOfThisDay = (day) => {
  if (day == null || day == '') return '';
  return moment(day).startOf('day').format('YYYY-MM-DD HH:mm:ss').toString();
};

export const getEndTimeOfThisDay = (day) => {
  if (day == null || day == '') return '';
  return moment(day).endOf('day').format('YYYY-MM-DD HH:mm:ss').toString();
};
