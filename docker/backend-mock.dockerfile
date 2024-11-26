FROM node:latest
LABEL maintainer="helciopenha"
COPY ./ /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["npm", "start"]
EXPOSE 3000
