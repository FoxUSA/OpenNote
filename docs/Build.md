# How to build
## Build Requirements
- npm
- Grunt `npm install -g grunt-cli`

## Build
Clone [this project](https://github.com/FoxUSA/OpenNote) an the [SharedServices Project](https://github.com/FoxUSA/OpenNoteService-PHP)

My project folder structure is setup as follows
```
Some working folder
├─ OpenNote
├─ OpenNote-SharedServices
├─ OpenNote-Docer
└─ OpenNote-CLI
```


`cd` into the OpenNote
Run `npm install` to fetch and install dependencies
Then run`grunt` this will start a webpack dev server and open your browser.

To test production bundles run `grunt testDeploy`.


### Usefull commands
You can see a full list of commands by running `grunt --help`.

Below are the most important commands
- `grunt default` or `grunt` to have webpack in development mode
- `grunt ci` run linting and tests
- `grunt deploy` Package up the project


To develop tests
```
grunt # in terminal A
npm run testSingle # in terminal B. Iterate on this terminal
```
