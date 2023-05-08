const alphabet = "abcdefghifklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!@#$%^&*_+=";

var enableSymbols = false;
var enableUppercase = false;
var enableNumbers = false;

function generatePassword(passwordLength) {
  if (passwordLength <= 50 && passwordLength >= 1) {
    // Number variables
    var numberCount = 0;
    var numberCountRange = [1, 3 + Math.floor(passwordLength / 4)];

    // Uppercase variables
    var uppercaseCount = 0;
    var uppercaseCountRange = [1, 3 + Math.floor(passwordLength / 4)];

    // Symbol variables
    var symbolCount = 0;
    var symbolCountRange = [1, 2 + Math.floor(passwordLength / 6)];

    // Output variables
    var generatedPassword = "";
    const passwordOutput = document.getElementById("password-output");

    // Generate letters
    for (var i = 0; i < passwordLength; i++) {
      // Slipt alphabet string and select a random character
      generatedPassword +=
        alphabet.split("")[Math.floor(Math.random() * alphabet.length)];
    }

    // Generate uppercase
    if (enableUppercase) {
      // UPPERCASE GENERATION PARAMETERS
      // adds a random number of uppercase letters between a defined range
      // range increase by 1 every 6 characters
      uppercaseCount = Math.floor(Math.random() * uppercaseCountRange[1] + 1);
      // Capitlize random characters in output password
      for (var i = 0; i < uppercaseCount; i++) {
        var randCharNum = Math.floor(Math.random() * passwordLength);
        generatedPassword = generatedPassword.replace(
          generatedPassword.charAt(randCharNum),
          generatedPassword.charAt(randCharNum).toUpperCase()
        );
      }
    }

    // Generate numbers
    if (enableNumbers) {
      // NUMBER GENERATION PARAMETERS
      // adds a random number of numbers between a defined range
      // range increase by 1 every 4 characters
      numberCount = Math.floor(Math.random() * numberCountRange[1] + 1);
      // Replace characters with numbers in output password
      for (var i = 0; i < numberCount; i++) {
        generatedPassword = generatedPassword.replace(
          generatedPassword.charAt(Math.floor(Math.random() * passwordLength)),
          Math.floor(Math.random() * 10)
        );
      }
    }

    // Generate symbols if enabled
    if (enableSymbols) {
      // SYMBOL GENERATION PARAMETERS
      // adds a random number of symbols between a defined range
      // range increase by 1 every 6 characters
      symbolCount = Math.floor(Math.random() * symbolCountRange[1] + 1);
      // Replace random characters in output password with a symbol
      for (var i = 0; i < symbolCount; i++) {
        generatedPassword = generatedPassword.replace(
          generatedPassword.charAt(Math.floor(Math.random() * passwordLength)),
          symbols.split("")[Math.floor(Math.random() * symbols.length)]
        );
      }
    }

    // Set visual password output
    passwordOutput.value = generatedPassword;
  }
}

function copyPassword() {
  const passwordOutput = document.getElementById("password-output");

  passwordOutput.select();
  passwordOutput.setSelectionRange(0, 999999);

  navigator.clipboard.writeText(passwordOutput.value);

  alert("🗝️ Password Copied to Clipboard 🗝️");
}

function init() {
  const passwordLengthInput = document.getElementById("password-length");
  passwordLengthInput.addEventListener("input", () => {
    generatePassword(passwordLengthInput.value);
    passwordLengthInputSlider.value = passwordLengthInput.value;
  });

  const passwordLengthInputSlider = document.getElementById(
    "password-length-slider"
  );
  passwordLengthInputSlider.addEventListener("input", () => {
    generatePassword(passwordLengthInputSlider.value);
    passwordLengthInput.value = passwordLengthInputSlider.value;
  });
}

// Run startup function when window loads
window.onload = init();
