# How to upgrade
###MYSql
- Make sure you make a copy of you database and the OpenNote directory
- Run `Service/model/sql/updateScript/` scripts to roll the database up to current specs.
- You will copy need to copy the upload directory contents into the new upload direcory in `Service/upload`.

###SQLite
Same as the MYSql. You may need to slightly modify the sql upload script to be compatible with sqlite.
