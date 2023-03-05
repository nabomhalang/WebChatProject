FROM node:version
WORKDIR /work
COPY package*.json /work/
RUN npm install
RUN npm install -g typescript
RUN npm install -D nodemon ts-node
COPY ./ /work/