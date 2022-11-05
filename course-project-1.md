# Scalablity Report

## 1. Guidance

This subject has three applications in diffrent folders, including express.js, koa2.js and go gin. The tests script are located in test-bitly. 

The test tool I use is k6.



The application is running in docker.  The database is also integrated in the docker.

### Run express.js

```shell
cd express-bitly
docker-compose up
```

### Run koa.js

```
cd nodejs-bitly
docker-compose up
```

### Run go gin

```
cd go-bitly
docker-compose up
```

### Run the test(when the service is running)

```shell
cd test-bitly
k6 run index.js
k6 run postShorten.js
k6 run redirect.js
k6 run random.js
```

All the servers will be run in localhost:7777.

	 - mainpage: localhost:7777
	 - Random url:localhost:7777/random

To make sure the random url works, the user needs to add some links in advance.



# 2. performance results

for all the test scripts, the total time would be 10s. The concurrent users are 10.

### main page: index.js

| Type       | avg/ms | med/ms | p(50)/ms | p(100)/ms |
| ---------- | ------ | ------ | -------- | --------- |
| express.js | 61.12  | 55.93  | 108.51   | 136.55    |
| koa.js     | 40.56  | 35.17  | 78.54    | 114.23    |
| golang gin | 42.15  | 23.92  | 130.98   | 219.12    |



### post new url: postShorten.js

| Type       | avg/ms | med/ms | p(50)/ms | p(100)/ms |
| ---------- | ------ | ------ | -------- | --------- |
| express.js | 40.23  | 34.69  | 73.45    | 117.78    |
| koa.js     | 19.09  | 15.43  | 39       | 50.91     |
| golang gin | 20.95  | 12.07  | 64.25    | 93.08     |



### redirect to new url : redirect.js

| Type       | avg/ms | med/ms | p(50)/ms | p(100)/ms |
| ---------- | ------ | ------ | -------- | --------- |
| express.js | 37.82  | 7.33   | 255.72   | 339.31    |
| koa.js     | 32.7   | 3.58   | 167.36   | 248.55    |
| golang gin | 29.43  | 23.83  | 77.43    | 111.82    |



### random go to a new url: random.js

| Type       | avg/ms | med/ms | p(50)/ms | p(100)/ms |
| ---------- | ------ | ------ | -------- | --------- |
| express.js | 70.24  | 48.73  | 232.46   | 317.36    |
| Koa.js     | 32.86  | 21.81  | 88.85    | 129.73    |
| golang gin | 39.18  | 40.06  | 89.16    | 106.32    |



# 3. Reflection

Reflection

In the applications, it is very interesting to figure out that Koa.js performs generally the best while golang gin is the most stable one. Express.js is not very good among the choices, and the med time is usually significantly lower than the average time. 

Suggestions to improve the performance:

1. The concurrent user number is small and the total time is small. Therefore, choosing a light-weight without heavy framework is better in the simple application.
2. The order of router match is important. Some match string is seldomly used, we need to consider put them back.
3. Some features such as cookie catch, sessions should be used. Otherwise, the sever will keep calculating the same url.
4. The shorten method is very important. Different hash methods will affect the performance greatly.