const ALPHA_REGEX_PATTERN = /^[A-Za-z]+$/;
let inputString = "";

const onInputTextBoxChange = () => {
    inputText = (String)(document.getElementById("inputTxtBox").value);
    validateInputString(inputText);
};

const onSubmit = () => {
    inputString = (String)(document.getElementById("inputTxtBox").value);
    
    if(!validateInputString(inputString))
        return;

    if(errorBox.innerHTML == ""){
        let output = [...inputString].reduce((occurence, ch) => !occurence[ch] ? { ...occurence, [ch]: 1 } : { ...occurence, [ch]: occurence[ch] + 1 }, {})
        for (let ch in output) {
            document.getElementById("output").innerHTML += "<p>" + ch + " = " + output[ch] + "</p>";
        }
        resetTextBox();
    }
}

const validateInputString = (inputText) => {
    if(inputText){
        if(!inputText.match(ALPHA_REGEX_PATTERN)){
            errorBox.innerHTML = "Invalid input";
            errorBox.style.display = "";
            return false;
        }
        else{
            resetHtml();
            return true;
        }
    }
}

function onFileSelected(fileEvent) {
    resetHtml();
    let file = fileEvent.target.files[0];
    if (file) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            validateInputString(contents);
            inputTxtBox.value = contents;
        }
        r.readAsText(file);
    }
    else {
        alert("Failed to load file");
    }
}

const resetHtml = () => {
    errorBox.innerHTML = "";
    output.innerHTML = "";
}

function resetTextBox() {
    inputTxtBox.innerHTML = "";
}

var eventListner = document.getElementById('filePicker');
if(eventListner){
    eventListner.addEventListener('change', onFileSelected, false)
}