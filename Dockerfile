FROM node:12

#create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN mkdir -p /tmp/config
# COPY config.json /tmp/config/
COPY config.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]