# My Portfolio

This is my personal portfolio made with React.

## Docker build

Use the following commands to build and run the portfolio with Docker:
```shell
docker build -t jmyounghoyos-portfolio:release .
docker run -d -it –rm -p 3002:80 –name jmyounghoyos-portfolio-instance jmyounghoyos-portfolio:release
```
## TODO

- [ ] Fix the drawer en low-end devices.

## Acknowledgement

I used this [video](https://youtu.be/3HNyXCPDQ7Q) is used as a base to build 
this portfolio.
