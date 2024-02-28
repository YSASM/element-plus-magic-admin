FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.2.0
ADD . /app/src
COPY node /usr/local
COPY nginx.conf /etc/nginx/conf.d/
RUN npm config set registry https://registry.npmmirror.com && npm install yarn -g


RUN cd /app/src && yarn config set registry https://registry.npmmirror.com && yarn && yarn run build && cp -r dist/* /usr/share/nginx/html
# RUN cd /app/src && cp -r dist/* /usr/share/nginx/html



WORKDIR /app
EXPOSE 9272


