const passwordDisplay = document.getElementById("passwordDisplay");
const rangeValue = document.getElementById("rangeValue");
const numberValue = document.getElementById("numberValue");
const upperCaseCheck = document.getElementById("includeUpperCase");
const lowerCaseCheck = document.getElementById("includeLowerCase");
const numbersCheck = document.getElementById("includeNumbers");
const symbolsCheck = document.getElementById("includeSymbols");

const formSubmit = document.getElementById("passwordGenertorForm");

const UPPERCASE_CHARCODES = generateArrays(65, 90);
const LOWERCASE_CHARCODES = generateArrays(97, 122);
const NUMBERS_CHARCODES = generateArrays(48, 57);
const SYMBOLS_CHARCODES = generateArrays(33, 47)
  .concat(generateArrays(58, 64))
  .concat(generateArrays(91, 96))
  .concat(generateArrays(123, 126));

formSubmit.addEventListener("submit", (s) => {
  s.preventDefault();
  const passwordLength = numberValue.value;
  const hasUpperCase = upperCaseCheck.checked;
  const hasLowerCase = lowerCaseCheck.checked;
  const hasNumbers = numbersCheck.checked;
  const hasSymbols = symbolsCheck.checked;
  if ((hasUpperCase || hasLowerCase || hasNumbers || hasSymbols) === false) {
    passwordDisplay.innerText = "Check atleast one category...";
    passwordDisplay.style.color = "red";
    setTimeout(() => (passwordDisplay.innerText = ""), 3000);
  } else {
    const password = generatePassword(
      passwordLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSymbols
    );
    console.log(password);
    passwordDisplay.style.color = "black";
    passwordDisplay.innerText = password;
  }
});

function generatePassword(
  passwordLength,
  hasUpperCase,
  hasLowerCase,
  hasNumbers,
  hasSymbols
) {
  let charCodes = [];

  if (hasUpperCase) {
    charCodes = charCodes.concat(UPPERCASE_CHARCODES);
  }
  if (hasLowerCase) {
    charCodes = charCodes.concat(LOWERCASE_CHARCODES);
  }
  if (hasNumbers) {
    charCodes = charCodes.concat(NUMBERS_CHARCODES);
  }
  if (hasSymbols) {
    charCodes = charCodes.concat(SYMBOLS_CHARCODES);
  }

  const passwordCharacterArray = [];
  for (let i = 0; i < passwordLength; i++) {
    const passwordCharacter =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacterArray.push(String.fromCharCode(passwordCharacter));
  }
  return passwordCharacterArray.join("");
}

function generateArrays(low, high) {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

rangeValue.addEventListener("input", syncLengthInputs);
numberValue.addEventListener("input", syncLengthInputs);

function syncLengthInputs(e) {
  const value = e.target.value;
  rangeValue.value = value;
  numberValue.value = value;
}
