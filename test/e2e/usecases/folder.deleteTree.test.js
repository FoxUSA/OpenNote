// jshint ignore: start
import { Selector, ClientFunction } from "testcafe"; // first import testcafe selectors
const WAIT_TIME = 1250; // Time to wait after some actions to give angular time to re render

module.exports = (helper)=>{

    return {
        name: "Delete folder tree",
        test: async testController => {
            //Create first level
            let firstLevelTag="#firstLevel"
            await helper.createFolder(testController, "NoteTestFolder")
                    .wait(WAIT_TIME)
            await helper.createNote(testController, "TestNote", `Quick. ${firstLevelTag}`).wait(WAIT_TIME);
            await testController.expect(await Selector("#sideBar ul li:first-child ").innerText).eql(firstLevelTag.toLowerCase());

            //Create second level
            await testController.click("#goToParentFolder");
            await helper.createFolder(testController, "SubFolder")
                    .wait(WAIT_TIME)
            await helper.createNote(testController, "Sub Note", "Bla #foo").wait(WAIT_TIME);
            await testController.expect(Selector("#sideBar ul").childElementCount).eql(2);//We should have two tags

            //Delete it
            await testController.click("#home")
                                .click(".folderPartial div.folder")
                                .wait(WAIT_TIME)
                                .click("#currentFolder")
                                .click("#delete")
                                .click("#alertify-ok")
                                .wait(WAIT_TIME);


            await testController.expect(Selector("#sideBar ul li:first-child").innerText).eql("No tags found. Add a # to a note to add a tag."); //Make sure no tags
            let result = await Selector("#currentFolder").innerText
            await testController.expect(result.trim()).eql("Home");//Make sure we are back to parent folder
            await testController.expect(Selector(".folderPartial div.folder").count).eql(0);//Make sure there are no folders anymore
        }
    };
};
