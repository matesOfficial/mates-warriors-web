const Convert = (text) => {
    if (text) {
        const result = text.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult
    }
    return text;
}


export default Convert
