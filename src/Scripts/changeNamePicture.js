function changeNamePicture(selectedFile,newName) {
    const partes = selectedFile["name"].split(".");
    const extension = partes[partes.length - 1];
    const name = `${newName}.${extension}`;
    const modifiedFile = new File([selectedFile], name, {
    type: selectedFile.type,
    });
    return modifiedFile;
}



export default changeNamePicture;