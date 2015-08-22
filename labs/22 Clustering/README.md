# Load Balancing


## 2. Logging

Google Container Advisor


## 7.  Benchmarking

As you develop your apps you need to check that they perform in a satisfactory manner under load. This means measuring how well it can handle multiple concurrent requests from different users. Doing this manually would require you to get lots of users to send requests at the same time or wait until the app goes live and see how it can handle the load.

Thankfully there are a number of tools available to simulate multiple connections to the server and the most popular one is called **Apache Bench**. This is an open source tool which will need to be installed on your development machine. Once installed we can quickly run benchmarking tests. In the example we ask the tool to make 2000 requests with 500 happening concurrently (at the same time). Finally we run the same test again using a POST request but with fewer concurrent requests.
```
sudo apt-get install apache2-utils
ab -n 2000 -c 500 http://192.168.99.100/
ab -n 20 -c 2 -p post_data -m POST http://192.168.99.100/
```
### 6.1 Documentation

You will be expected not only to build online apps but also to run benchmarks with appropriate values and interpret the results. You should take the time to read the documentation. As with most open-source tools this is available at two levels.

1. you can use the **--help** flag, `ab --help` to get a quick summary of the options
2. you can access the full manual `man ab` as well. The space bar moves forward a page, the *b* key moves back and the *q* key quits.
