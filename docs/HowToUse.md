# How to use

```
+---------+                                                   +-------------------------+
|OpenNote |                                                   |          CouchDB        |
|(Web App)+<--------------PouchDB sync----------------------->+//Stores notes and folder|
+----+----+                                                   +--------------+----------+
     ^                                                                       ^
     |                                                                       |
     |                                                                       |PouchDB sync
     |Pre-signed urls (De-coupled)                                           |
     |                                                                       |
     v                                                                       v
+----+-------------------------+                +----------------------------+----------+
|Minio                         |                |               OpenNote-CLI            |
|//Stores blob data like images+<-S3 API (TEMP)-+//Allows use of other editors like Atom|
+------------------------------+                +---------------------------------------+
```

OpenNote, when utilized fulloy, is made up of several components

Component | Purpose
--------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
OpenNote  | A PWA(Offline compatible) web application that allows you edit and access notes.
CouchDB   | Couch DB is a database that stores your notes. When this is setup, you do not need to worry if your phone gets lost. When fully replicated, your notes will be safely stored in CouchDB. CouchDB also allows multiple browsers to sync. So you can have your notes on all your devices.
Minio     | Minio is a blob storage server that implements the AWS S3 API. This allows you to upload your images and non text files for use with OpenNote.
[OpenNote-CLI](https://github.com/FoxUSA/OpenNote-CLI) | OpenNote CLI syncs the database to disk. This allows you to use other editors like Atom to create and edit notes.

## General

OpenNote uses a touch to open scheme. If you want to open something just click it.

## Browsing

Now that you are logged in, you can browse around. At first you won't have any folders or notes. So, create some! Once you have some stuff simply click on a folder(Always Green) or browse a tree view on the left to crawl into you notes.

![][toplevel] Eventually you'll find a note(Always blue) that you want to open. Simply click it or touch it.

![][plants]

## Notes

Once you click on a note you'll will be presented with it in a read only view.

![][seedsview] If you want to edit a note, click on the "Edit" button in the top bar

![][seedsedit] This will bring you to the editor. Once you are all done editing, click "Save" to store the note.

[plants]: ./images/plants.png
[seedsedit]: ./images/seedsEdit.png
[seedsview]: ./images/seedsView.png
[toplevel]: ./images/topLevel.png
