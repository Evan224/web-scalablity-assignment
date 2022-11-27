# Project 2 report

# guidance.

This is a mock programming test application. You need to first cd to the ui
folder, and run

```
npm install
```

And then In the root folder, run

```
docker-compose up.
```

And change to the grader-image folder to run the grader image

# Core web vitals and performance test results

For the web vitals, I have used React framework. You will see the result in the
console.log. For the performance test results, I have used K6. you need to run

```
k6 run index.js
```

for the test.

The results are as follows: for the web vitals:

TTFB: 19.599999994039536 FCP:185 CLS:0 LCP: 185.099

The light house result is 77 marks for the overall performance.

For the K6 test,

1. Test the main page (I have included the questions also in the main page).
   time: 10s, users:100 http_req_receiving: avg=31.2µs med=25µs p(99)=92.75µs
   p(95)=70µs

2. Test the api post time: 10s, users:100 http_req_receiving: avg=28.78µs
   med=20µs p(99)=101µs p(95)=64µs

3. Test the api get time: 10s, users:100 http_req_receiving: avg=35.87µs
   med=32µs p(99)=102µs p(95)=74µs

# Brief reflection

I think the api design has many aspects to better. I have used the localstorage
for many requests. I think this will affect my performance. Besides, I actually
did not really understand the message queues well enough.

# Brief suggestion for improvements

I think I need find better way to solve the data persistency problem. Besides,
the backend api is not written very well, I should use better framework for the
backend service. What's more, the sqls are not efficient enough.

<!-- ○ Brief guidelines for running the application (and performance tests if they have been ran with scripts).
○ Core web vitals and performance test results.
○ A brief reflection (5-10 sentences) on the present performance of the application.
○ A brief list of suggestions (5-10 sentences) for improving the
performance of the application. -->
