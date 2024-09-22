const { timeStamp, count } = require('console');
const path = require('path');

const uploadSingleFile = async (fileObject) => {
    const timestamp = Date.now();
    const ext = path.extname(fileObject.name); // Get the file extension
    const fileName = `${path.basename(fileObject.name, ext)}- ${timestamp}${ext}`;

    let uploadPath = path.resolve(__dirname, '../public/images/upload', fileName);

    // Use the mv() method to place the file somewhere on your server

    try {
        await fileObject.mv(uploadPath);
        // console.log(path.extname(fileObject.name));
        return {
            status: 'success',
            path: uploadPath,
            error: null
        }
    } catch (err) {
        return {
            status: 'false',
            path: 'null',
            error: JSON.stringify(err)
        }
    }
}


// const uploadMultipleFiles = async (filesArray) => {
//     const upLoadResults = []
//     for (file of filesArray) {
//         const result= await uploadSingleFile(file);
//         upLoadResults.push(result);
//     }
//     return{
//         status :'success',
//         files :upLoadResults
//     }

// }
const uploadMultipleFiles = async (filesArray) => {
    try {
        uploadPath = path.resolve(__dirname,"../public/images/upload");
        // console.log(uploadPath);
        const timestamp =Date.now();
        const resultArr =[];
        const countSuccess =0;
        
        for(i =0;i<filesArray.length ;i++){
            const extName= path.extname(filesArray[i].name);
            // console.log(extName);
            const baseName =path.basename(filesArray[i].name,extName);
            // console.log(baseName);
            const finalName =`${baseName}-${timestamp}${extName}`;
            // console.log(finalName);
            const finalPath =`${uploadPath}/${finalName}`;
            // console.log(finalPath);
            try {
                await filesArray[i].mv(finalPath);
                resultArr.push({
                    status :'success',
                    path :finalName,
                    fileName:filesArray[i].name,
                    error :null,
                });
                countSuccess++;        
            } catch (err) {
                resultArr.push({
                    status :'false',
                    path :null,
                    fileName:filesArray[i].name,
                    error :JSON.stringify(err),
                });
            }
        }
        return{
            countSuccess:countSuccess,
            detail :resultArr,
        }
    } catch (error) {
        console.log(error);
    }

}
module.exports = { uploadSingleFile, uploadMultipleFiles }    