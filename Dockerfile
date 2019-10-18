FROM node:lts-jessie

WORKDIR /usr/src/jobboard-fe

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]