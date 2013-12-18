# How To Install

###MYSql
- Create a MYSQL database named "OpenNote"
- Download and extract OpenNote into a folder on your php web-server called "OpenNote"
- Open up the `model/sql` folder and run `notebook.sql` in your OpenNote database
- Change the database connection settings inside of `web-server path/OpenNote/Config.php` to match your db settings.
These are stored in the following lines of code in `/OpenNote/Config.php`:
```php
	public static $dbUserName = "notebook";
	public static $dbPassword = "password";
	public static $dbServer = "localhost";
	public static $dbName = "notebook";
```
			
- Now the site install is complete. You can now open the site by going to your webserver url +/OpenNote

###SQLite
- Download and extract OpenNote into a folder on your php web-server called "OpenNote"
- Move the SQLite database file from `model/sql` folder to a folder not in the web server www directory.
- Change the database connection settings inside of `web-server path/OpenNote/Config.php` to match your db settings.
- These are stored in the following lines of code in `/OpenNote/Config.php`:

Uncomment the following lines in the dbConfig function:

`return self::sqliteConfig()`

Comment the following lines in the dbConfig function:

`//return self::mysqlConfig();`

```php
	$dbName = "../<relative path>/OpenNote.sqlite";
```
			
- Now the site install is complete. You can now open the site by going to your webserver url +/OpenNote