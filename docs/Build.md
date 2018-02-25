# How to build
## Build Requirements
- npm
- Grunt `npm install -g grunt-cli`

## Build
Clone the projects and set them up in the structure below
```
Some working folder
├─ OpenNote
├─ OpenNote-SharedServices
├─ OpenNote-Docker
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
- `grunt deploy` Package up the project into the `dist` folder. Creates a zip with the version number that can be uploaded to Github.


To develop tests
```
grunt # in terminal A
npm run testSingle # in terminal B. Iterate on this terminal
```
