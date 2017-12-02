// class Utils {
//     constructor() {

//         this.validNumber = this.validNumber.bind(this);
//     }

    function validNumber(_value) {
        //
        let validChars = ("1234567890.").split("");
        let enteredChars = _value.split("");
        
        return (enteredChars.map((_char) => {
            if (validChars.indexOf(_char) != -1) {
                return _char;
            }
        })).join("");
    }
// }

export {
    validNumber
};