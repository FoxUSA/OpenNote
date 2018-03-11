// jshint ignore: start
import { Selector, ClientFunction } from "testcafe"; // first import testcafe selectors
const WAIT_TIME = 1250; // Time to wait after some actions to give angular time to re render

module.exports = (helper)=>{
    return {
        name: "Delete folder and make sure other folders are fine",
        test: async testController => {
            //Create first folder
            let firstLevelTag="#firstLevel"
            await helper.createFolder(testController, "NoteTestFolder")
                    .wait(WAIT_TIME)
            await helper.createNote(testController, "TestNote", `Quick. ${firstLevelTag}`).wait(WAIT_TIME);
            await testController.expect(await Selector("#sideBar ul li:first-child ").innerText).eql(firstLevelTag.toLowerCase());

            //Create second folder
            let secondFolderTitle="ZZZZ";//Folders are displayed alphabetically
            let secondNoteTitle ="Sub Note";
            let secondNoteTag = "#foo";
            await testController.click("#home")
            await helper.createFolder(testController, secondFolderTitle)
                    .wait(WAIT_TIME)
            await helper.createNote(testController, secondNoteTitle, `Bla ${secondNoteTag}`).wait(WAIT_TIME);
            await testController.expect(Selector("#sideBar ul").childElementCount).eql(2);//We should have two tags

            //Delete it
            await testController.click("#home")
                                .click(".folderPartial div.folder:first-child")
                                .wait(WAIT_TIME)
                                .click("#currentFolder")
                                .click("#delete")
                                .click("#alertify-ok")
                                .wait(WAIT_TIME);


            //Assert Tags
            await testController.expect(Selector("#sideBar ul li:first-child").innerText).eql(secondNoteTag); //Make sure no tags
            await testController.expect(Selector("#sideBar ul").count).eql(1);//We should have one tags

            //Assert folders
            await testController.wait(WAIT_TIME).expect(Selector(".folderPartial div.folder").count).eql(1);
            let result = await Selector(".folderPartial div.folder h4").innerText
            await testController.expect(result.trim()).eql(secondFolderTitle);//Make sure we are back to parent folder
        }
    };
};
