import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UpdateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(RelativeTime);
dayjs.extend(UpdateLocale);
dayjs.updateLocale('ko', {
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: '%s 후', // e.g. in 2 hours, %s been replaced with 2hours
    past: '%s 전',
    s: '방금',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간', // e.g. 2 hours, %d been replaced with 2
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년',
  },
});

export const getRelativeTimeText = (to) => dayjs(to).fromNow();
