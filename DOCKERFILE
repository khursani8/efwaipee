# Set the base image to Ubuntu
FROM    ubuntu

# File Author / Maintainer
MAINTAINER khursani8

# Update the repository
RUN apt-get update &&  apt-get -y install curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get -y install git python build-essential nodejs

# RUN npm install -g nodemon pm2

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /home/app && cp -a /tmp/node_modules /home/app/

COPY . /home/app/

WORKDIR /home/app/

RUN  npm install

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm","start"]
