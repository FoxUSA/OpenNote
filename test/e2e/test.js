// jshint ignore: start

import { Selector, ClientFunction } from "testcafe"; // first import testcafe selectors

const WAIT_TIME = 500; // Time to wait after some actions to give angular time to re render

fixture`Getting Started`
            .page `http://127.0.0.1:8080/`
            .afterEach(async testController => {//Clean up local storage and local db
                let clean = ClientFunction(() => {
                    localStorage.clear();
                    return PouchDB("openNote").destroy()
		        });

        		await clean();
            });

/**
 * Create a folder. Expects to be in a folder partial.
 * @param  {[type]} testController [description]
 * @param  {[type]} name           - name folder
 * @return {testController}                - testController object
 */
let createFolder = (testController, name) => {
    return  testController.click("#newFolder")
                .typeText("#alertify-text", name)
                .click("#alertify-ok");
}


/**
 * Create a note. Expects to be in a sub folder in a folder partial.
 * @param  {[type]} testController [description]
 * @param  {[type]} title          [description]
 * @param  {[type]} note           [description]
 * @return {testController}                - testController object
 */
let createNote = (testController, title, note) => {
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
}

/**
 * Edits a note. Expects to be on a note partial
 * @param  {[type]}  testController [description]
 * @param  {[type]}  title          [description]
 * @param  {[type]}  note           [description]
 */
let editNote = async (testController, title, note) => {
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

test("Create Folder", async testController => {
    //Arrange

    //Act
    let folderName="TestFolder"
    await createFolder(testController, folderName).wait(WAIT_TIME)

    //Asert
    let result = await Selector("#currentFolder").innerText;//#Stupid should really just be sync
    await testController.expect(result.trim()).eql(folderName);
});

test("Create note", async testController => {
    //Arrange

    //Act
    let title="TestNote";
    let tag = "#Something"
    let note = `Now is the time for all good men to come to the aid of their country. ${tag}`;

    await createFolder(testController, "NoteTestFolder")
            .wait(WAIT_TIME)

    await createNote(testController, title, note)

    //Asert
    let titleActual = await Selector("#noteName").value;
    let noteActual = await Selector("#note").innerText;//#Stupid should really just be sync
    let tagActual = await Selector("#sideBar ul li:first-child ").innerText;
    await testController.expect(titleActual).eql(title);
    await testController.expect(noteActual.trim()).eql(note);
    await testController.expect(tagActual).eql(tag.toLowerCase());

});

test("Edit note", async testController => {
    //Arrange

    //Act
    let title="TestNote";
    let tag = "#Something"
    let note = `Now is the time for all good men to come to the aid of their country. ${tag}`;

    await createFolder(testController, "NoteTestFolder")
            .wait(WAIT_TIME)

    await createNote(testController, title, note)

    title="TestNote2";
    tag = "#SomethingElse"
    note = `YO ${tag}`;

    await editNote(testController, title, note)

    //Asert
    let titleActual = await Selector("#noteName").value;
    let noteActual = await Selector("#note").innerText;//#Stupid should really just be sync
    let tagActual = await Selector("#sideBar ul li:first-child ").innerText;
    await testController.expect(titleActual).eql(title);
    await testController.expect(noteActual.trim()).eql(note);
    await testController.expect(tagActual).eql(tag.toLowerCase());
});

test("Delete note", async testController => {
    //Arrange

    //Act
    let folderName = "NoteTestFolder";
    await createFolder(testController, folderName)
            .wait(WAIT_TIME);

    await createNote(testController, "TestNote", "Now is the time for all good men to come to the aid of their country. #something");

    await testController.click("#edit")
                  .click("#removeNote")
                  .click("#alertify-ok");

    //Asert
    await testController.expect(Selector("#sideBar ul li:first-child ").innerText).eql("No tags found. Add a # to a note to add a tag.");
    let result = await Selector("#currentFolder").innerText;//Make sure we are back to parent folder
    await testController.expect(result.trim()).eql(folderName);
});

test("Delete folder tree", async testController => {
    //Create first level
    let firstLevelTag="#firstLevel"
    await createFolder(testController, "NoteTestFolder")
            .wait(WAIT_TIME)
    await createNote(testController, "TestNote", `Quick. ${firstLevelTag}`).wait(WAIT_TIME);
    await testController.expect(await Selector("#sideBar ul li:first-child ").innerText).eql(firstLevelTag.toLowerCase());

    //Create second level
    await testController.click("#goToParentFolder");
    await createFolder(testController, "SubFolder")
            .wait(WAIT_TIME)
    await createNote(testController, "Sub Note", "Bla #foo").wait(WAIT_TIME);
    await testController.expect(Selector("#sideBar ul").childElementCount).eql(2);//We should have two tags

    //Delete it
    await testController.click("#home")
                        .click(".folderPartial div.folder")
                        .click("#currentFolder")
                        .click("#delete")
                        .click("#alertify-ok")
                        .wait(WAIT_TIME);


    await testController.expect(Selector("#sideBar ul li:first-child").innerText).eql("No tags found. Add a # to a note to add a tag."); //Make sure no tags
    let result = await Selector("#currentFolder").innerText
    await testController.expect(result.trim()).eql("Home");;//Make sure we are back to parent folder
    await testController.expect(Selector(".folderPartial div.folder").length).eql(0);//Make sure there are no folders anymore
});
