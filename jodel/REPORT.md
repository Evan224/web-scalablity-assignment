# Project 2 report

# guidance.

This is a mock chatting message application. 

To run the application in local docker, run:
```
docker-compose up

```
Sometimes the flyway will be a bit late, the server will run at localhost:7800.

Then, if you want to deploy the application, you need to first load the images in your local kubernetes cluster.

```
cd kurbenetes
minikube start
minikube image build -t ui ../ui
minikube image build -t api ../api
kubectl apply -f ui.yaml   
kubectl apply -f api.yaml   
kubectl apply -f database.yaml   
kubectl apply -f nginx2.yaml 
minikube tunnel
```

besides, to run the test:

The k6 tests are in the tests folder

```
cd tests

k6 run getMainPage.js
k6 run postMessage.js
k6 run getMainPage.js

k6 run getDetailPage.js
k6 run postApply.js
k6 run getDetailPage.js

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

1. The main page without messages time: 10s, users:100
   http_req_receiving:  avg=30.34µs med=20µs    p(99)=103µs    p(95)=67µs  

2. Test the post with messages
   http_req_receiving: avg=56.34µs  med=47µs     p(99)=141µs  p(95)=98.04µs

3. The main page without messages time: 10s, users:100
   http_req_receiving:  avg=avg=32.08µs med=23µs    p(99)=117µs    p(95)=76µs

4. The detail page without messages time: 10s, users:100
   http_req_receiving:  avg=55.83µs  med=50µs     p(99)=141.48µs p(95)=99µs  

5. Test the post wiith replies  time: 10s, users:10
   http_req_receiving:  avg=47.53µs  med=39µs     p(99)=138µs    p(95)=99µs

6. The detail page with messages time: 10s, users:100
   http_req_receiving:  avg=58.34µs  med=49µs     p(99)=135µs    p(95)=100µs

   


# Brief reflection

This big project is a bit hard for me. The k8s is a new technology for me and there are many issues that are hard to find online. But overall it is still a very interesting tool to use and deploy.
The scroll function is very interesting. There are many solutions in the frontend to do that. And the event function is surely the key concept of the application, which is also very challenge.

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
