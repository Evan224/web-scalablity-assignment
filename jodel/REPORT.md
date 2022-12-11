# Project 2 report

# guidance.

This is a mock programming test application. You need to first cd to the
grader-image folder

```
cd grader-image

docker build -t grader-image .
```

And then In the root folder, run

```
docker-compose up.
```

The k6 tests are in the tests folder

```
cd tests

k6 run getAPITest.js
k6 run getDetailPage.js
k6 run getMainPage.js
k6 run postTest.js
```

# Core web vitals and performance test results

For the web vitals, I have used React framework. You will see the result in the
console.log.

for the test.

The results are as follows: for the web vitals:

TTFB: 7.40 The time to the first byte measures the delay between the moment a
user requests our page and when the first byte of the response arrives.

FCP: 274.7 The first contentful paint measures the delay between when the page
starts loading and when any part of the content is visible.

CLS:0 The cumulative layout shift detects sudden changes to the webpage. If a
text or a link moves unexpectedly, we can end up clicking on something else by
accident. < 0.1 is a good number.

LCP: 185.099 The largest contentful paint reports the render time of the largest
image or text block visible in the viewport. We should aim to have an LCP of 2.5
seconds or less.

The light house result is 93 marks for the overall performance in desktop.

For the K6 test,

1. Test the getAPITest (get all problems status). time: 10s, users:100
   http_req_receiving: avg=32.2µs med=26µs p(99)=103µs p(95)=75µs

2. Test the getDetailPage (get the detail page status) . 10s, users:100
   http_req_receiving: avg=44.15µs med=38µs p(99)=113µs p(95)=86µs

3. Test the main get time: 10s, users:100 http_req_receiving: avg=28.87µs
   med=21µs p(99)=100µs p(95)=66µs

4. Test the submit solution time 10s, users:100 http_req_receiving: avg=30.39µs
   med=25µs p(99)=101.95µs p(95)=71µs

# Brief reflection

This big project is a bit hard for me. The k8s is a new technology for me and there are many issues that are hard to find online. But overall it is still a very interesting tool to use and deploy.
The scroll function is very interesting. There are many solutions in the frontend to do that. And the SSE function is surely the key concept of the software.

# Brief suggestion for improvements

I think I need find better way to solve the data persistency problem. Besides,
the backend api is not written very well, I should use better framework for the
backend service. What's more, the sqls are not efficient enough. And I may need
to use the modern job queue solutions in the future.

<!-- ○ Brief guidelines for running the application (and performance tests if they have been ran with scripts).
○ Core web vitals and performance test results.
○ A brief reflection (5-10 sentences) on the present performance of the application.
○ A brief list of suggestions (5-10 sentences) for improving the
performance of the application. -->
