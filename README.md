OpenNote
=============
OpenNote was built to be a open web based alternative to Microsoft OneNote (T) and EverNote.

Features
--------
- Full WYSIWYG editor
- Touch friendly and mouse friendly ui
- Upload manager (not enabled in demo :) )
- Light weight
- Multi user support
- Note History ***(Revisions are currently being stored. However, there is not view to see revision tree)
- Search
- PDO Connector/(MySql and SQLite Database Support)

Upcoming Features
-----------------
- Email to note
- Move notes
- Implement history
- Install script

Demo
----
http://stardrive.us/OpenNote/

Please like us at http://alternativeto.net/software/opennote/

How To Install
--------------
- Create a MYSQL database named "OpenNote"
- Download and extract OpenNote into a folder on your php web-server called "OpenNote"
- Open up the model/sql folder and run "notebook.sql" in your OpenNote database
- Change the database connection settings inside of web-server path/OpenNote/Config.php to match your db settings.
These are stored in the following lines of code in /OpenNote/Config.php:
```php
	public static $dbUserName = "notebook";
	public static $dbPassword = "password";
	public static $dbServer = "localhost";
	public static $dbName = "notebook";
```
			
- Now the site install is complete. You can now open the site by going to your webserver url +/OpenNote


How To Use
----------
OpenNote uses a touch to open scheme.
If you want to open something just click it.
	
## Login
To login simple go to your instance on OpenNote. You will need to have javascript enabled
Then simply click "Login"

![][login]

## Browsing
Now that you are logged in, you can browse around. At first you won't have any folders or notes. So, create some!
Once you have some stuff simply click on a folder(Always Green) or browse a tree view on the left to crawl into you notes.

![][topLevel]
Eventually you'll find a note(Always blue) that you want to open. Simply click it or touch it.

![][plants]	

## Notes
Once you click on a note you'll will be presented with it in a read only view.

![][seedsView]
If you want to edit a note, click on the "Edit" button in the top bar

![][seedsEdit]
This will bring you to the CKEditor. Once you are all done editing, click "Save" to store the note.
Dont worry to much about the changing the content of your notes. The program keeps a history of what you changed.

License
-------
	JQuery - Distributed under the MIT License
	JSTree - "Same as JQuery"

	CKEditor - Distributed under the MPL License

	OpenNote Code - Distributed under Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
	
	Other OpenNote licenses are available for purchase from the author
	© Jacob Liscom 2013
	
Credits
-------
	J. Liscom - Supreme Programmer

	Kam Bnkamalesh - His TODO project heavily influenced my UI design

	Microsoft - For making terrible products
	Evernote - For making better products in a slightly evil way

[login]: https://raw.github.com/FoxUSA/OpenNote/master/Doc/login.png 
[topLevel]: https://raw.github.com/FoxUSA/OpenNote/master/Doc/topLevel.png
[plants]: https://raw.github.com/FoxUSA/OpenNote/master/Doc/plants.png 
[seedsView]: https://raw.github.com/FoxUSA/OpenNote/master/Doc/seedsView.png
[seedsEdit]: https://raw.github.com/FoxUSA/OpenNote/master/Doc/seedsEdit.png
