function capitalizeFisrtLetter(text){
    const newText = text.trim()
    return newText[0].toUpperCase() + newText.slice(1);
}
export default capitalizeFisrtLetter;