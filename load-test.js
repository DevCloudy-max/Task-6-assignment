import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 }, // ramp-up to 10 users
        { duration: '20s', target: 10 }, // stay at 10 users
        { duration: '10s', target: 0 },  // ramp-down
    ],
};

export default function () {
    const res = http.get('http://localhost:3000');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
