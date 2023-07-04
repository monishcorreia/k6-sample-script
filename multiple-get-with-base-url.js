import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  thresholds: {
    // Define the performance thresholds for the test
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // Less than 10% of requests should fail
  },
  stages: [
    // Define the stages of the load test
    { duration: '30s', target: 50 }, // Ramp up to 50 virtual users in 30 seconds
    { duration: '1m', target: 50 }, // Maintain 50 virtual users for 1 minute
    { duration: '30s', target: 0 }, // Ramp down to 0 virtual users in 30 seconds
  ],
};

const BASE_URL = 'https://reqres.in';

export default function () {
  // Send a GET request to the 'users' endpoint
  const usersResponse = http.get(`${BASE_URL}/api/users`);

  // Check if the response status is 200 (OK)
  check(usersResponse, { 'Users API - Status is 200': (r) => r.status === 200 });

  // Send a GET request to the 'posts' endpoint
  const postsResponse = http.get(`${BASE_URL}/api/posts`);

  // Check if the response status is 200 (OK)
  check(postsResponse, { 'Posts API - Status is 200': (r) => r.status === 200 });

  // Send a GET request to the 'comments' endpoint
  const commentsResponse = http.get(`${BASE_URL}/api/comments`);

  // Check if the response status is 200 (OK)
  check(commentsResponse, { 'Comments API - Status is 200': (r) => r.status === 200 });

  // Add a sleep period between requests (in milliseconds)
  sleep(1);
}
