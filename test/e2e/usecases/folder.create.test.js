// jshint ignore: start
import { Selector} from "testcafe"; // first import testcafe selectors
const WAIT_TIME = 1250; // Time to wait after some actions to give angular time to re render

module.exports = (helper)=>{
    return {
        name: "Create Folder",
        test: async testController => {
            //Arrange

            //Act
            let folderName="TestFolder";
            await helper.createFolder(testController, folderName).wait(WAIT_TIME);

            //Asert
            let result = await Selector("#currentFolder").innerText;//#Stupid should really just be sync
            await testController.expect(result.trim()).eql(folderName);
        }
    };
};
