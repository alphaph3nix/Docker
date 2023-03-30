# node image
FROM node

# create a working directory inside the container
WORKDIR /src

# Copy all files from current directory to working directory in image (/src)
ADD . .

# install node modules
RUN npm install

# execute the command to start the app 
CMD ["node","server.js"]

