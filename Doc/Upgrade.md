# How to upgrade

##Upgrading from 14.07(Locomotive) to 14.07.01(Steam Locomotive). 
All you need to do is merge your existing deployment with the release folder while keeping your config files (`openNote\openNote.config.js` and `\Service\Config.php`). 

###MySQL(Recomended)
- Make sure you make a copy of you database and the OpenNote directory
- Run `Service/model/sql/updateScript/` scripts to roll the database up to current specs.
- You will copy need to copy the upload directory contents into the new upload direcory in `Service/upload`.
- You will also need to put int you database information in the new config `Service/Config.php`

###SQLite
Same as the MySQL. You may need to slightly modify the sql upload script to be compatible with SQLite. I have included as much as I can in scripts with the postfix of .sqlite.sql. SQLite does not fully support the ALTER statement.
