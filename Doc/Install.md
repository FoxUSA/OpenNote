# How To Install
[Download most resent release from here.][Download]

# Using Docker(Full Stack)
Make sure docker in running in daemon mode with restart previously running containers on
`docker -d -r` or you could louse your notes if you do not know what your doing

Pull the current docker image 
`docker pull foxusa/opennote`

and run it on port 80
`sudo docker run -d -p 80:80 -p 443:443 foxusa/opennote`

or if port 80 is in use
`sudo docker run -d -p 8080:80 -p 8443:443 foxusa/opennote`

# Automatic(Wizard Based Install)
To run the installer open
`<install path>/Service/install.php`

Make sure you delete `install.php` and `Config.template`.

### Security Note
Be default we put the sqlite databse in the web folder. This is not a good idea. We solved this by putting in a htaccess file to not allow the database to be downloaded.

Still, you should move this file out of the webserver directory and change the location in `Config.php`

## Manual
###MYSql
- Create a MYSQL database named "OpenNote"
- Download and extract OpenNote into a folder on your php web-server called "OpenNote"
- Open up the `Service/model/sql` folder and run `notebook.sql` in your OpenNote database
- Change the database connection settings inside of `Service/Config.php` to match your db settings.
These are stored in the following lines of code in `/OpenNote/Config.php`:
```php
	$dbUserName = "notebook";
	$dbPassword = "password";
	$dbServer = "127.0.0.1";
	$dbName = "notebook";
```
			
- Now the site install is complete. You can now open the site by going to your webserver url +/OpenNote

###SQLite
- Download and extract OpenNote into a folder on your php web-server called "OpenNote"
- Create a SQLite database file and execute the SQL DDL from `Service/model/sql` and run `notebook.sqlite.sql`.
- Change the database connection settings inside of `Service/Config.php` to match your db settings.
- These are stored in the following lines of code in `/OpenNote/Config.php`:
- Also make sure you have php5-sqlite driver installed and have group write access to SQLite database file, or you cannot register or login and you can't see any useful error messages.

Uncomment the following lines in the dbConfig function:

`return self::sqliteConfig()`

Comment the following lines in the dbConfig function:

`//return self::mysqlConfig();`

```php
	$dbName = "../<relative path>/OpenNote.sqlite";
```
			
- Now the site install is complete. You can now open the site by going to your webserver url +/OpenNote

[Download]: https://github.com/FoxUSA/OpenNote/releases
