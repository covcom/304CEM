
FROM node:0.12.7
WORKDIR /home
RUN mkdir data
RUN npm install restify
ADD index.js /home/index.js
CMD ["node", "/home/index.js"]
