# How to upgrade

##Upgrading from 14.xx(Locomotive) to 15.07.01
All you need to do is merge your existing deployment with the release folder while keeping your config files (`openNote\openNote.config.js` and `\Service\Config.php`).
Make sure to backup your old folder and database.

There have been major changes in this release.
You will need to follow the CouchDB instructions in the Install documentation.


##Docker(14.07.01 to 14.07.02)
Find the container id of your running container by doing a `docker ps` or `docker ps -l` if the OpenNote conatiner was the last one you stopped.
You should see output like this
```
CONTAINER ID        IMAGE               	COMMAND             CREATED             STATUS                     PORTS               NAMES
3922ee1d8b5d        foxusa/opennote:latest  /run.sh             9 seconds ago       Exited (0) 1 seconds ago                       jolly_almeida
```

Stop that container if it is still running
`docker stop 3922ee1d8b5d`

Now commit that container id
`docker commit 3922ee1d8b5d`

You should now get a really long new container id
`c523f0fd9efdf0e9d640467d02d118dd02fa61ac14d8296e9e4e3a220cb8058e`

Run that new container
`docker run -it  c523f0fd9efdf0e9d640467d02d118dd02fa61ac14d8296e9e4e3a220cb8058e bash`
This should open up a bash prompt

Run the following commands
`wget https://raw.githubusercontent.com/FoxUSA/OpenNote-Docker/master/UpgradeScripts/14.07.02.sh -P /app/~upgrade;sh /app/~upgrade/14.07.02.sh`

After that run `exit` to stop the container

Now we have a upgraded container we can use
Run `docker ps -l` to find the container ID we just upgraded
```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
b648919c634e        c523f0fd9efd        bash                3 minutes ago       Exited (0) 2 seconds ago                       thirsty_mcclintock
```
Get the newest container id `b648919c634e`

Commit it
`docker commit b648919c634e`

Get another new long containerID
`cf77323ed72659b3462073763e9115ff16bb4ae64ce406176703bbc781011ccb`

and run that with published ports
`sudo docker run -d -p 80:80 -p 443:443 cf77323ed72659b3462073763e9115ff16bb4ae64ce406176703bbc781011ccb /run.sh`

or if port 80 is in use

`sudo docker run -d -p 8080:80 -p 8443:443 cf77323ed72659b3462073763e9115ff16bb4ae64ce406176703bbc781011ccb /run.sh`

All done

##Manual installs

##Upgrading from 14.07(Locomotive) to 14.07.01(Steam Locomotive) or 14.07.01(Steam Locomotive) to 14.07.02 (Diesel Locomotive).
All you need to do is merge your existing deployment with the release folder while keeping your config files (`openNote\openNote.config.js` and `\Service\Config.php`).

###MySQL(Recomended)
- Make sure you make a copy of you database and the OpenNote directory
- Run `Service/model/sql/updateScript/` scripts to roll the database up to current specs.
- You will copy need to copy the upload directory contents into the new upload direcory in `Service/upload`.
- You will also need to put int you database information in the new config `Service/Config.php`

###SQLite
Same as the MySQL. You may need to slightly modify the sql upload script to be compatible with SQLite. I have included as much as I can in scripts with the postfix of .sqlite.sql. SQLite does not fully support the ALTER statement.
