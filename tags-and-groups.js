import { check } from 'k6';
import http from 'k6/http';

const id = 5;

export default function () {
  // Get user
  {
    const res = http.get(`https://reqres.in/api/users/2`);
    // Perform checks for the get post request
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }

  // List users
  {
    const res = http.get(`https://reqres.in/api/users`);
    // Perform checks for the list posts request
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }
}
