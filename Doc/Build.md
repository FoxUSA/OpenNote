# How to build

## Clone
You will need to clone the front end and the backend
https://github.com/FoxUSA/OpenNote
https://github.com/FoxUSA/OpenNoteService-PHP

Most of the buid tasks require the OpenNote and OpenNoteService-PHP to be in the same folder

For example
In the folder `OpenNote` we expect `openNote`, and `Service` to be sister folder.

I normally have `Service` folder as a symbolic link to `OpenNoteService-PHP/Service`;

Once the `OpenNote` and `OpenNoteService-PHP` project have been cloned you need to build the projects
To do so for the front end project
- Run `npm install` to install all the needed development dependencies.
- Then, you need to run `grunt build` in `OpenNote/`(This runs bower install and builds the less css)

In the PHP service you will need too
- You need to run `php ./composer.phar install -v` to install all the php dependencies and build the projects autoloading structure 

## Build Requirments
- npm
- Bower
- Grunt
- Composer

## Build
Run from OpenNote project
`grunt build`

