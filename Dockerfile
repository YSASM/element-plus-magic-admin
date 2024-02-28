FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.2.0
RUN rm -rf /usr/local
ADD . /app/src
RUN cd /app/src && \
 curl https://nodejs.org/dist/v18.2.0/node-v18.2.0-linux-x64.tar.gz --output node.tar.gz &&\
 tar -xvf node.tar.gz && \
 mv node-v18.2.0-linux-x64 /usr/local
RUN npm config set registry https://registry.npmmirror.com && npm install yarn -g


RUN cd /app/src && yarn config set registry https://registry.npmmirror.com && yarn && yarn run build && cp -r dist/* /usr/share/nginx/html
# # RUN cd /app/src && cp -r dist/* /usr/share/nginx/html



# WORKDIR /app
EXPOSE 9272


