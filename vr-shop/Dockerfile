FROM node:latest
WORKDIR /usr/src/myapp
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install yarn -y
RUN yarn global add nodemon
CMD ["yarn", "--version"]