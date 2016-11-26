
FROM node:7.2.0
WORKDIR /home
RUN mkdir data
RUN npm install restify
ADD index.js /home/index.js
EXPOSE 8080
CMD ["node", "/home/index.js"]
