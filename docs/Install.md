# How To Install
Put the following text in a `docker-compose.yml`. Make sure to set all the items marked `#TODO`. Also make sure this file is in a secure place. Your credentials are stored in it.
```
version: "2"
services:
    opennote:
     image: foxusa/opennote
     ports:
         -   "8080:80"
    couchdb:
        image: couchdb
        ports:
            -   "5984:5984"
            -   "6984:6984"
        environment:
            COUCHDB_USER: user #TODO set this
            COUCHDB_PASSWORD: password #TODO set this

    minio:
        image: minio/minio
        volumes:
            -   "/tmp/data:/data" #TODO set this
        ports:
            -   "9000:9000"
        environment:
            MINIO_ACCESS_KEY: tests #TODO set this
            MINIO_SECRET_KEY: testssdfasdf #TODO set this
        command: server /data

```
## Start
`docker-compose up -d` to start




## Uninstall
If you ever want to shutdown OpenNote run `docker-compose down` in the same folder as `docker-compose.yml`. This will shut down the containers associated with OpenNote.
