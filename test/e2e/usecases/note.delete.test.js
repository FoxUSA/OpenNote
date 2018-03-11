// jshint ignore: start
import { Selector, ClientFunction } from "testcafe"; // first import testcafe selectors
const WAIT_TIME = 1250; // Time to wait after some actions to give angular time to re render

module.exports = (helper)=>{
    return {
        name: "Delete note",
        test: async testController => {
            //Arrange

            //Act
            let folderName = "NoteTestFolder";
            await helper.createFolder(testController, folderName)
                    .wait(WAIT_TIME);

            await helper.createNote(testController, "TestNote", "Now is the time for all good men to come to the aid of their country. #something");

            await testController.click("#edit")
                          .click("#removeNote")
                          .click("#alertify-ok");

            //Asert
            await testController.expect(Selector("#sideBar ul li:first-child ").innerText).eql("No tags found. Add a # to a note to add a tag.");
            let result = await Selector("#currentFolder").innerText;//Make sure we are back to parent folder
            await testController.expect(result.trim()).eql(folderName);
        }
    };
};
