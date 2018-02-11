# How to build
## Build Requirements
- npm
- Grunt `npm install -g grunt-cli`

## Build
Clone this project
`cd` into the project
Run `npm install` to fetch and install dependencies
Then run
`grunt build`
this will start a webpack dev server.

To test production bundles run `grunt testDeploy`

//TODO new stuff and note in an ascii tree how the shared services are are expected to be neighbors of the cli and OpenNoteFolder


//TODO grunt --help to get steps

Super important
grunt default or grunt
grunt ci
grunt deploy //TODO


To develop tests
```
grunt dev # in terminal A
npm run testChrome # in terminal B. Iterate on this terminal
```
