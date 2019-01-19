var fs = require("fs");

const FileOperations = {
    getFileContent : function(filePath){
        var data = "";
        try{
            data = fs.readFileSync(filePath);
        } catch(e){
            console.log("Failed to read file : "+filePath)
        }
        console.log(data.toString());
        return data.toString();
    }
}
export default FileOperations;