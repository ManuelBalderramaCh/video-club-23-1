FROM node
MAINTAINER Manuel Balderrama
ENV HOME /root
COPY ./app.js ./app.js
CMD node app.js