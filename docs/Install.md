# How To Install

Put the following text in a `docker-compose.yml`. Make sure to set all the items marked `#TODO`. Also make sure this file is in a secure place. Your credentials are stored in it.

```
version: "2"
services:
    opennote:
        image: foxusa/opennote
        volumes:
            -   "<HOST_LOCATION>:/root/certs:ro"#TODO set this
        ports:
            -   "80:80"
            -   "443:443"
            -   "6984:6984" #CouchDB Proxy
        links:
            - "couchdb:couchdb"
    couchdb:
        image: couchdb
        volumes:
            -   "<HOST_LOCATION>:/opt/couchdb/data" #TODO set this
            -   "<HOST_LOCATION>:/root/certs:ro" #TODO set this
        ports:
            -   "5984:5984"
            -   "6984:6984"
        environment:
            COUCHDB_USER: user #TODO set this
            COUCHDB_PASSWORD: password #TODO set this

    minio:
        image: minio/minio
        volumes:
            -   "<HOST_LOCATION>:/data" #TODO set this
            -   "<HOST_LOCATION>:/root/.minio/certs:ro" #TODO set this
        ports:
            -   "9000:9000"
        environment:
            MINIO_ACCESS_KEY: tests #TODO set this
            MINIO_SECRET_KEY: testssdfasdf #TODO set this
        command: server /data
```

## Setup
- [ ] `docker-compose up -d` to start

 > If you need to get into a container to configure something you can do so `docker-compose exec $container /bin/sh` IE `docker-compose exec couchdb /bin/sh`.
### SSL
Create a folder with a SSL `private.key` and `public.crt` this gets mounted by nginx and minio to encrypt connections.
the `public.crt` file should have your servers cert and the whole cert chain appended to it.

### OpenNote
- [ ] (Optional) Configure SSL:  
Run `docker-compose exec opennote nano /etc/nginx/conf.d/default.conf` and use [this config](https://github.com/FoxUSA/OpenNote-Docker/blob/master/samples/nginx/default.conf) as a template.
- [ ] Run `docker-compose exec opennote nano /etc/nginx/nginx.conf`  and add this line at the end of the http block
`client_max_body_size 100M;`

### CouchDB
- [ ] Go to `http://$serverurl:5984/_utils/#_config/nonode@nohost/cors` and enable CORS for your domain.
- [ ] Go to `http://$serverurl:5984/_utils/#_config/nonode@nohost` and set `require_valid_user` to true. If you are unable to get to the login screen after setting that, you can access it via `http://$serverurl:5984/_utils/#login`

### Minio
- [ ] Create OpenNote bucket

>finally run `docker-compose restart to use the updated configurations`.

## Syncing

By default OpenNote is storing info in your browser. Until you setup syncing, you are at risk of lousing your notes. To setup syncing. From the home page click `Settings`, then click database. On the right hand side of the panel you will see a Replication url field. This expect a url to your couchDB database in the form of `$protocol://$user:$password@$serverurl:$port/$database`.

For example if your server information is as follows:

Item      | Value
--------- | ---------
protocol  | http
user      | admin
password  | password
serverurl | 127.0.0.1
port      | 5984
database  | opennote

then your replication url would be `http://admin:password@127.0.0.1:6984/opennote`

You will see an alert if replication is working.

## Uninstall

If you ever want to shutdown OpenNote run `docker-compose down` in the same folder as `docker-compose.yml`. This will shut down the containers associated with OpenNote.

## SSL
You can use lets encrypt to get a free valid SSL cert. See https://letsencrypt.org/ and their tool [Cert Bot Tool](https://certbot.eff.org/)
