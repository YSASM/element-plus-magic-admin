FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.2.0
ADD . /app/src
# RUN wget https://nodejs.org/dist/v18.2.0/node-v18.2.0-linux-x64.tar.gz
# RUN tar -xvf node-v18.2.0-linux-x64.tar.gz
# COPY node-v18.2.0-linux-x64 /usr/local
# COPY nginx.conf /etc/nginx/conf.d/
# RUN npm config set registry https://registry.npmmirror.com && npm install yarn -g


# RUN cd /app/src && yarn config set registry https://registry.npmmirror.com && yarn && yarn run build && cp -r dist/* /usr/share/nginx/html
# # RUN cd /app/src && cp -r dist/* /usr/share/nginx/html



# WORKDIR /app
EXPOSE 9272


