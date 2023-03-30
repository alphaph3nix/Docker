# Docker Tutorial 

## Getting Started 

### to check version :
```
docker version
```
### open docker help commands  
```
docker 
```
### run the docker/getting-started image
```
docker run -d -p 80:80 docker/getting-started
```

### listing docker containers 
```
//Active containers
docker ps  

// All containers
docker ps -a 
```


![getting started.png](images%2Fgetting%20started.png)

### the link to the running container  

http://localhost

### stop the container
```
docker stop Container_ID
```
### remove the container
```
docker rm Container_ID
```

### create and run a container from the alexwhen/docker-2048 image 
```
docker run -d -p 80:80 alexwhen/docker-2048
```

### get into the container terminal & launch an sh shell on interactive mode   
```
docker exec -it Container_ID_or_Container_Name sh
```

![Docker.png](images%2FDocker.png)

### nginx
```
docker run -d -p 8080:80 nginx
```

### WordPress
```
docker run --name Container_Name -d -p 8081:80 wordpress
```

### remove a running container 
```
docker rm -f Container_ID_or_Container_Name
```

### running container and defining multiple host ports 
```
docker run -p 3000:80  -p 5000:80  -p 9000:80 -d docker/getting-started
```

### listing all docker images pulled locally (Docker Host) from the dockerHub (Registries)
```
docker image ls
or
docker images
```

- the image and the containers do have a relationship , 
therefore we cannot remove the image before removing its containers

- The docker images, are stored inside the docker directory:
/var/lib/docker/ images are stored there.

### remove a docker image 
```
docker rmi Image_Repository 
or
docker image rm Image_Name 
```

### pulling docker image from the dockerHub
```
docker pull Image_Name 
```

<ins>A good practice is to pull the image then to run the container </ins>

### inspect docker image 
```
docker image inspect Image_Name 
```
## Docker architecture

![Docker Daemon.png](images%2FDocker%20Daemon.png)

- Docker Daemon is the tool that executes commands from the client to the docker host  

- Docker Daemon is a part of Docker host

- The client issues commands to docker Daemon via the unix socket that is located in "/var/run/docker.sock"


### run bash container and create a .txt file with "foo" and then deletes the container
```
docker run bash -c "echo foo > bar.txt & cat bar.txt"
```

### opening the .txt file 
```
docker run bash -c "cat bar.txt"
```
gives this result

![Open file.png](images%2FOpen%20file.png)

## Bind mount Volumes

![bind mount volume.png](images%2Fbind%20mount%20volume.png)

### binding and using a volume 

#### creating a folder for the volume

```
cd Desktop
mkdir bind-mount
pwd 
echo $PWD
```
output 

![volume output.png](images%2Fvolume%20output.png)

#### running the bash container again and binding the volume (**creating and displaying the .txt file**)
```
docker run -v $PWD:/tmp bash bash -c "echo foo > tmp/bar.txt & cat tmp/bar.txt"
```
#### running the bash container and binding the volume (**displaying the .txt file**)
```
docker run -v $PWD:/tmp bash bash -c "cat tmp/bar.txt"
```
output

![display file.png](images%2Fdisplay%20file.png)

Volumes are used to share data between the host and the container 

## Using volumes for local Dev

### download and extract this version of bootstrap theme in Desktop folder 

via this link https://startbootstrap.com/theme/sb-admin-2

###  running nginx
```
cd Desktop/dashboard
docker run  --name dashboard -d -p 8080:80 nginx
```

### mounting the bootstrap theme folder under a specific path with nginx ( $PWD = $(pwd) = %cd% )
```
docker run --name dashboard -v $PWD:/usr/share/nginx/html -d -p 8080:80 nginx
```

accessing the link http://localhost:8080/ 

will give the dashboard theme instead of the classic nginx welcome page

the changes made to index.html page on the bootstrap theme folder will be replicated in the container  

![screen.png](images%2Fscreen.png)

AMIGOSCODE on the sidebar instead of SB admin

## Docker Volumes 

###  display volumes commands 
```
docker volume --help
```

### listing docker volumes
```
docker volume ls 
```

![Docker volumes.png](images%2FDocker%20volumes.png)

## Dockerfile

![Docker file content.png](images%2FDocker%20file%20content.png)

###  building the dashboard image
```
docker build . -t dashboard
```
- <strong>-t</strong> stands for tag name


###  running a container dashboard from  the dashboard built image 
(**using built dashboard  image instead of nginx image**)

```
docker run --name dashboard -d -p 8080:80  dashboard
```
<ins>note that we don't need the volume argument because it is already specified in the DockerFile</ins> 

## Building ExpressJS API

Creating the user-api 

### creates and runs a container from the node image and initializing npm
```
docker run -w /src -v $PWD:/src --rm node npm init --yes
docker run -w /src -v $PWD:/src --rm node npm i -S express
```
- <strong>-w</strong> creates a folder inside the container <strong>/src  </strong> 
- <strong>-v</strong> mounting a volume  
- <strong>-rm</strong> removes the container when it exists 
- <strong>node</strong> the image name from docker registry
- <strong>npm init --yes / npm i -S express</strong> commands to be executed in docker container

#### removing node_modules folder

#### creating Dockerfile

after creating the Dockerfile inside the user-api folder

###  building the user-api image
```
docker build . -t user-api
```

###  running the user-api image
```
docker run --name user-api -d -p 3000:3000 user-api
```

### the link to the running container

http://localhost:3000/

### to get list of users

http://localhost:3000/api/v1/users


### pull postgres Image from DockerHub
```
docker pull postgres
```

## Docker tags 

### pull a specific postgres Image from DockerHub
```
docker pull postgres:14.7
```

### display tag commands
```
docker tag --help
```

### create a new tag (1.0) based of latest for the dashboard image 
```
docker tag dashboard:latest dashboard:1.0
```

### creating two tags for dashboard (latest & 1.0) overriding latest to 1.0
```
cd ~/Desktop/dashboard

docker build . -t dashboard:latest -t dashboard:1.0
```


###  running the dashboard image (1.0 & latest)
```
docker run --name dashboard-v1 -d -p 8080:80 dashboard:1.0
docker run --name dashboard-latest -d -p 8081:80 dashboard
```
<ins>note that when we don't specify the tag latest will be chosen by default </ins>


### creating two tags for dashboard (latest & 2.0) overriding latest to 2.0
```
docker build . -t dashboard:latest -t dashboard:2.0
```

###  running the dashboard image (2.0 & latest)
```
docker run --name dashboard-latest -d -p 8082:80 dashboard
```

<ins>note that we should never use the tag latest in production</ins>

## Docker registries

### Docker login
```
docker login
```

- we enter the UserName and the Password of the dockerHub Account

- docker login is necessary to pull private images from dockerHub account

### checking docker login credentials 

![login docker.png](images%2Flogin%20docker.png)

<ins>note that if we log out from docker the auths filed will be empty</ins>

### pushing docker image into dockerHub repository

- we first create the docker repository in the dockerHub ( specifying if it is private or public )

- the next step is to re-tag the image in order to be pushed into our account repositories

- we push the newly tagged image using the command : 
     <strong> docker push Account_Name/Image_Name:tag </strong>


### re-tagging the image with the username in order to be pushed to dockerhub repository
```
docker tag user-api:latest anayaro/user-api:latest
docker images 
```

### pushing the docker image to dockerHub repository 
```
docker push anayaro/user-api:latest
```

## Debugging

### inspecting containers 
```
docker inspect ContainerName_or_ContainerID
docker inspect dashboard-v1
```

### display log for a container
```
docker logs ContainerName_or_ContainerID
docker logs dashboard-v1
```

### starting a container
```
docker start ContainerName_or_ContainerID
docker start dashboard-v1
```

### Run a command in a running container
```
docker exec ContainerName_or_ContainerID command
```

### Run a command in a running container (**check environment variables**)
```
docker exec ContainerName_or_ContainerID env
docker exec dashboard-v1 env
docker exec user-api env
```

### Run a command in a running container (**listing files in working directory**)
```
docker exec ContainerName_or_ContainerID ls
docker exec dashboard-v1 ls
docker exec user-api ls
```

---

```
docker exec -it user-api bash
//or
docker exec -it user-api sh
#ls
#pwd
#top
```
- <strong>-it</strong> stands for interactive mode 
- <strong>sh</strong> is the default shell for nginx
- with this command we get inside the container 
- press <strong>Ctrl + c</strong> or <strong>Ctrl +d</strong> to quit the commandline 
- we need to know what type of command line that is supported by the container 
  sometimes it does not support neither sh nor bash

## Networking

### display network commands
```
docker network --help
```
### creating a network
```
docker network create  networkName
docker network create  mongo
```

### inspect network
```
docker inspect networkName
```

### running mongoDB container with mongo network

```
docker run --name mongo -d --network mongo -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=username \
-e MONGO_INITDB_ROOT_PASSWORD=password \
mongo
```

### running Mongo-Express container with mongo network
```
docker run --name mongo-express --network mongo -d -p 8081:8081  \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=username \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongo  mongo-express
```
- <strong>-e</strong> stands for environment args


### access mongo-express via this link

http://localhost:8081/

Note that <strong>mongo-express</strong> container is connected to our <strong>mongo</strong> container via the <strong>network mongo</strong>

### Container communication

![container communication.png](images%2Fcontainer%20communication.png)


## Connecting to mongo container from the newly created container with sh
```
docker run --rm -it mongo sh
# mongosh 
```
- <strong>--rm</strong> removes the container as when we exit the sh commandline 
- we use <strong>mongosh</strong> instead of <strong>mongo</strong> for the newer versions 

![mongosh localhost.png](images%2Fmongosh%20localhost.png)

### specifying the host to mongo 
```
# mongosh --host mongo -u username -p password 
```
![mongosh address error.png](images%2Fmongosh%20address%20error.png)

- note that this container cannot connect to the mongo container be cause it is not using the mongo network
- the host argument has to be specified by the container's name

### specifying the network when running the container 
```
docker run --network mongo --rm -it mongo sh
# mongosh --host mongo -u username -p password  
```

![mongosh working.png](images%2Fmongosh%20working.png)

- this time it is working (y)

### displaying databases
```
# show databases 
```
![mongosh databases.png](images%2Fmongosh%20databases.png)

## Connecting to user-api container to dashboard-v1 container

```
docker start user-api
docker start dashboard-v1
docker network create test
docker network connect test user-api 
docker network connect test dashboard-v1 
```

```
docker exec -it dashboard-v1 sh
# curl user-api:3000/api/v1/users
```

![connect dashboard to user-api.png](images%2Fconnect%20dashboard%20to%20user-api.png)

- successfully connected to user-api from dashboard (y)


### we can disconnect a container from a network using this command
```  
docker network disconnect network_name container_name
```

## Docker Compose

###  display docker compose commands

```
//V1
docker-compose --help
//V2
docker compose --help
```

###  Using docker-compose file to spin off (create/delete) mongo and mongo-express and connecting them

```
//creating the folder

cd Desktop
mkdir docker-compose
cd docker-compose

//creating the docker-compose file

touch docker-compose.yml
ls
```

### Docker compose services

we have docker-compose.yml file that contains the 2 services mongo and mongo-express

inside docker compose file we can specify
- services
- networks
- volumes

### launching the services/ networks / volumes with docker compose file 
```
docker compose up -d
docker compose start
docker compose stop
```


### removing the services/ networks / volumes with docker compose file
```
docker compose down
```


## Security and Static Analysis Tools

```
//deprecated will no longer be supported after April 13th, 2023.
docker scan image_name

// use the scout instead of scan
docker scout cves image_name
docker scout cves dasboard
```
![docker scout.png](images%2Fdocker%20scout.png)

- more often than not we cant get vulnerabilities to 0 
- we should focus on treating the high/ medium risk ones 

### We can use Trivy  that is the open source version of Snyk

check these links for more information 

https://trivy.dev/
https://aquasecurity.github.io/trivy/v0.38/

trivy scan for two types of security issues
- vulnerabilities
- misconfigurations

```
docker run -v /var/run/docker.sock:/var/run/docker.sock \ 
-v $HOME/Library/Caches:/root/.cache/ aquasec/trivy:0.38.3 image Image_Name
```

### Distroless Images 

- they are very small
- Using distroless images in production is best practice
- distroless images only contain our application and its dependencies , 
- they do not contain package managers , nor shells or any other programs found in a standard linux distribution

check these links for more information

https://github.com/GoogleContainerTools/distroless


#### scanning the distroless image of java17 with docker scout
```
docker scout cves gcr.io/distroless/java17-debian11	
```

![distroless image.png](images%2Fdistroless%20image.png)

#### scanning the distroless image of java17 with trivy

```
docker run -v /var/run/docker.sock:/var/run/docker.sock \
-v $HOME/Library/Caches:/root/.cache/ aquasec/trivy:0.38.3 \
image gcr.io/distroless/java17-debian11
```

### More Security best practices

check these links for more information

https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html


