
FROM node:6.4.0

ADD src/ /src
WORKDIR /src
RUN npm install
ENV PORT 8080
EXPOSE: 8080

CMD ['npm', 'start']
