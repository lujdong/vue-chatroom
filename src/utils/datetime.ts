import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export const fromNow = (dateTime: string) => {
  return dayjs(dateTime).fromNow();
};
