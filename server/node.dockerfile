# Create a custom bridge network and add containers into it
# ------------------------------------------------------------
# Also, see
#   https://github.com/docker-library/mysql/issues/95#issuecomment-359163865
#   https://severalnines.com/blog/mysql-docker-containers-understanding-basics

# # Create a node.dockerfile
# # Convert this file into an image (from the same folder location / pwd)
# # dbConfig { host: 'some-mariadb' }
#	    docker build -f node.dockerfile -t sj/nodeapp:batuktina .
# # Create a network
#	    docker network create --driver bridge isolated_network
# # Run mariadb
# # Note that [-e MYSQL_ROOT_HOST=%] is necessary for SQLElectron (0.0.0.0:3306)
#	    docker run -p 3306:3306 -d --net=isolated_network --name some-mariadb -e MYSQL_ROOT_PASSWORD=tangent90 -e MYSQL_ROOT_HOST=% -d mariadb:latest
# # Run the node app
#	    docker run -d --net=isolated_network --name nodeapp -p 3000:3000 sj/nodeapp:batuktina
# # Open browser to localhost:3000


FROM node:10-alpine

LABEL author="Sandeep Joshi"

ENV NODE_ENV=development
ENV PORT=3000

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

## THE LIFE SAVER
## https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b
## https://github.com/ufoscout/docker-compose-wait
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# ENTRYPOINT ["npm", "start"]
CMD /wait && npm start

