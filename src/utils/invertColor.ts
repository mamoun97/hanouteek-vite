const invertColor = (color: string) => {
    try{
        let hex = color.replace(/[^0-9A-F]/gi, '');
    let rgb = "";
    for (let i = 0; i < 3; i++) {
        rgb += parseInt(hex.substr(i * 2, 2), 16);
        if (i < 2) rgb += ",";
    }
    // Invert RGB
    let invertedRgb = rgb.split(',').map(c => 255 - parseInt(c)).join(',');
    // RGB to Hex
    let invertedHex = "#";
    for (let i = 0; i < 3; i++) {
        let val = parseInt(invertedRgb.split(',')[i]).toString(16);
        if (val.length === 1) val = '0' + val; // Make sure it's two digits
        invertedHex += val.toUpperCase();
    }
    // Calculate luminance
    const luminance = (0.2126 * parseInt(hex.substr(0, 2), 16)) +
        (0.7152 * parseInt(hex.substr(2, 2), 16)) +
        (0.0722 * parseInt(hex.substr(4, 2), 16));
    // Return white or black depending on luminance
    return luminance > 128 ? "#000000" : "#FFFFFF";
    }catch(err){
        return "#000000"
    }
}

export default invertColor