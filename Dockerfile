FROM node:18
ADD . /app
WORKDIR /app
RUN mkdir /app/log
RUN cd /app && \
    chmod +x start.sh && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm install && \
    npm run build
EXPOSE 9272
CMD [ "/app/start.sh" ]


