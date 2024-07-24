import http from 'k6/http';
import { check, sleep } from 'k6';

const userId = '01J35TJPAZREQNZ9CKYTTT1870';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  let res = http.get(`http://localhost:4020/user?userId=${userId}`);
  check(res, { 'Post status is 200': r => r.status === 200 });
  sleep(0.3);
}
