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
## Setup
- [ ] `docker-compose up -d` to start
- CouchDB
    - [ ] Go to `http://$serverurl:5984/_utils/#_config/nonode@nohost/cors` and enable CORS for your domain.
    - [ ] Go to `http://$serverurl:5984/_utils/#_config/nonode@nohost` and set `require_valid_user` to true. If you are unable to get to the login screen after setting that, you can access it via `http://$serverurl:5984/_utils/#login`
    - [ ] Setup SSL [via this guide](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=48203146) //TODO


- Minio
    - [ ] Setup SSL //TODO https://docs.minio.io/docs/how-to-secure-access-to-minio-server-with-tls
    - [ ] Create OpenNote bucket

## Syncing
By default OpenNote is storing info in your browser. Until you setup syncing, you are at risk of lousing your notes. To setup syncing. From the home page click `Settings`, then click database. On the right hand side of the panel you will see a Replication url field. This expect a url to your couchDB database in the form of `$protocol://$user:$password@$serverurl:$port/$database`.

For example if your server information is as follows:

Item | Value
--- | ---
protocol | http
user | admin
password | password
serverurl | 127.0.0.1
port | 5984
database | opennote

then your replication url would be `http://admin:password@127.0.0.1:6984/opennote`

You will see an alert if replication is working.

## Uninstall
If you ever want to shutdown OpenNote run `docker-compose down` in the same folder as `docker-compose.yml`. This will shut down the containers associated with OpenNote.
