// jshint ignore: start
import { ClientFunction} from "testcafe"; // first import testcafe selectors
fixture `OpenNote`
            .page `http://127.0.0.1:8080/`
            .afterEach(async testController => {//Clean up local storage and local db
                let clean = ClientFunction(() => {
                    localStorage.clear();
                    return PouchDB("openNote").destroy()
                });

                await clean();
            });


/**
 * List of helper functions
 */
const helper = {
        /**
         * Create a folder. Expects to be in a folder partial.
         * @param  {[type]} testController [description]
         * @param  {[type]} name           - name folder
         * @return {testController}                - testController object
         */
        createFolder: (testController, name) => {
            return  testController.click("#newFolder")
                        .typeText("#alertify-text", name)
                        .click("#alertify-ok");
        },


        /**
         * Create a note. Expects to be in a sub folder in a folder partial.
         * @param  {[type]} testController [description]
         * @param  {[type]} title          [description]
         * @param  {[type]} note           [description]
         * @return {testController}                - testController object
         */
        createNote: (testController, title, note) => {
            let typeString = note.split("")

            typeString.forEach((char, index)=>{
                if(char != " ")
                    return;
                typeString[index]="space";
            });
            typeString = typeString.join(" ");

            return testController.click("#newNote")
                        .typeText("#noteName", title,{replace:true})
                        .click(".CodeMirror-scroll")
                        .pressKey(typeString)
                        .click("#save")
        },

        /**
         * Edits a note. Expects to be on a note partial
         * @param  {[type]}  testController [description]
         * @param  {[type]}  title          [description]
         * @param  {[type]}  note           [description]
         */
        editNote: async (testController, title, note) => {
            const CLEAR_STRING = "ctrl+a backspace"
            let typeString = note.split("")

            typeString.forEach((char, index)=>{
                if(char != " ")
                    return;
                typeString[index]="space";
            });
            typeString = typeString.join(" ");

            await testController.click("#edit")
                        .typeText("#noteName", title,{replace:true})
                        .click(".CodeMirror-scroll")
                        .pressKey(CLEAR_STRING)
                        .pressKey(typeString)
                        .click("#save")
        }
    }

let path = __dirname+"/usecases/";
require("fs").readdirSync(path).forEach(function(file) {
    let testInfo = require(path + file)(helper);
    test(testInfo.name, testInfo.test);//There has to be a better way to do this. If this function is not here atleast onces tests will not load from other files. If it is, tests can be defined in imports.
});

//Remember you can do a .debug() to hault execution to debug
