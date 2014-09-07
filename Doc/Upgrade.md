# How to upgrade
###MySQL
- Make sure you make a copy of you database and the OpenNote directory
- Run `Service/model/sql/updateScript/` scripts to roll the database up to current specs.
- You will copy need to copy the upload directory contents into the new upload direcory in `Service/upload`.
- You will also need to put int you database information in the new config `Service/Config.php`

###SQLite
Same as the MySQL. You may need to slightly modify the sql upload script to be compatible with sqlite.
