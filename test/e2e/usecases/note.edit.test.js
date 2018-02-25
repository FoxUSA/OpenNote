// jshint ignore: start
import { Selector, ClientFunction } from "testcafe"; // first import testcafe selectors
const WAIT_TIME = 1250; // Time to wait after some actions to give angular time to re render

module.exports = (helper)=>{
    return {
        name: "Edit note",
        test: async testController => {
            //Arrange

            //Act
            let title="TestNote";
            let tag = "#Something"
            let note = `Now is the time for all good men to come to the aid of their country. ${tag}`;

            await helper.createFolder(testController, "NoteTestFolder")
                    .wait(WAIT_TIME)

            await helper.createNote(testController, title, note)

            title="TestNote2";
            tag = "#SomethingElse"
            note = `YO ${tag}`;

            await helper.editNote(testController, title, note)

            //Asert
            let titleActual = await Selector("#noteName").value;
            let noteActual = await Selector("#note").innerText;//#Stupid should really just be sync
            let tagActual = await Selector("#sideBar ul li:first-child ").innerText;
            await testController.expect(titleActual).eql(title);
            await testController.expect(noteActual.trim()).eql(note);
            await testController.expect(tagActual).eql(tag.toLowerCase());
        }
    };
};
