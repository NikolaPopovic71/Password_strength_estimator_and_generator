document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const strengthDisplay = document.getElementById("strength");

  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.match(/[A-Z]/)) strength += 1;
  if (password.match(/[a-z]/)) strength += 1;
  if (password.match(/[0-9]/)) strength += 1;
  if (password.match(/[\W_]/)) strength += 1;

  if (strength <= 2) {
    strengthDisplay.textContent = "Weak";
    strengthDisplay.className = "weak";
  } else if (strength === 3 || strength === 4) {
    strengthDisplay.textContent = "Medium";
    strengthDisplay.className = "medium";
  } else if (strength === 5) {
    strengthDisplay.textContent = "Strong";
    strengthDisplay.className = "strong";
  }
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    this.textContent = type === "password" ? "Show" : "Hide";
  });

document
  .getElementById("generatePassword")
  .addEventListener("click", function () {
    const length = parseInt(document.getElementById("passwordLength").value);
    if (!length || length < 8 || length > 99) {
      alert("Please enter a valid length between 8 and 99.");
      return;
    }
    const generatedPassword = generatePassword(length);
    document.getElementById("generatedPassword").value = generatedPassword;
  });

function generatePassword(length) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const allChars = lowercase + uppercase + numbers + special;

  let password = "";

  // Ensure at least one of each required character type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest of the password length with random characters from allChars
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password to ensure the characters are randomly distributed
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

document.getElementById("copyPassword").addEventListener("click", function () {
  const generatedPassword = document.getElementById("generatedPassword");
  generatedPassword.select();
  generatedPassword.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(generatedPassword.value).then(
    function () {
      alert("Password copied to clipboard!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
});

document.getElementById("clearPassword").addEventListener("click", function () {
  document.getElementById("password").value = "";
  document.getElementById("strength").textContent = "";
  document.getElementById("strength").className = "";
});

document
  .getElementById("clearGeneratedPassword")
  .addEventListener("click", function () {
    document.getElementById("generatedPassword").value = "";
    document.getElementById("passwordLength").value = "";
  });
