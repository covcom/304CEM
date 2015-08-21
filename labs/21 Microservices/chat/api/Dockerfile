FROM node:0.12.7
WORKDIR /home
RUN npm install request restify ioredis mysql-promise
ADD index.js /home/index.js
EXPOSE 80:8080
CMD ["node", "/home/index.js"]
