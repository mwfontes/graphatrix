class Utils {
    
    constructor() {
        
    }
    
    // Returns only valid number related characters
    static validNumber(_value) {
        //
        let validChars = ("1234567890.-").split("");
        let enteredChars = _value.split("") || [];
        let dots = 0;

        // Verifies if there is more than one dot in the array
        
        return (enteredChars.map((_char, i) => {
        if (validChars.indexOf(_char) != -1) {
                if (_char == ".") {
                    dots++;
                }
                if (_char == "." && i == 0) {
                    _char = "0" + _char;
                }
                if (_char == "." && dots > 1) {
                    return;
                }
                return _char;
            }
        })).join("");
    }

    static degToRad(_val) {
        //
        return (_val / 180) * Math.PI;
    }

    static radToDeg(_val) {
        //
        return (_val / Math.PI) * 180;
    }
}

export default Utils;