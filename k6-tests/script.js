import http from 'k6/http';
import { check, sleep } from 'k6';

const serverUrl = 'http://localhost:4020';

export const options = {
  scenarios: {
    user_get: {
      exec: 'userget',
      // name of the executor to use
      executor: 'constant-vus',      
      // executor-specific configuration
      vus: 50,
      duration: '30s',
      // env specific config
      tags: { 
        name: 'UserGetUrl' 
      },
    }
  }
};

export function userget() {
  const userId = '01J35TJPAZREQNZ9CKYTTT1870';
  let res = http.get(`${serverUrl}/user?userId=${userId}`);
  check(res, { 'Post status is 200': r => r.status === 200 });
  sleep(0.3);
}
