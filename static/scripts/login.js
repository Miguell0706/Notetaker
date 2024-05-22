
async function fetchRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    //get a new quote if the the quote exceeds more than 100 characters
    if (data.content.length > 100) {
      return fetchRandomQuote();
    }
    return data.content;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "An error occurred while fetching the quote.";
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  const quoteElement = document.getElementById("quote");
  // Fetch a random quote
  const quote = await fetchRandomQuote();
  // Display the quote
  try {
    quoteElement.textContent = quote;
  } catch {
    return;
  }
});
//This function is to show and hide the password
function showPassword() {
  var passwordInput = document.getElementById("password");
  var eyeOpen = document.getElementById("eye-open");
  var eyeClosed = document.getElementById("eye-closed");
  // Toggle the input type between 'password' and 'text'
  if (passwordInput.type === "password") {
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  } else {
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  // change eyeclosed to dsiplay None and eyeopen to display block
}
function showPassword2() {
  var passwordInput = document.getElementById("password1");
  var eyeOpen = document.getElementById("eye-open2");
  var eyeClosed = document.getElementById("eye-closed2");
  // Toggle the input type between 'password' and 'text'
  if (passwordInput.type === "password") {
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  } else {
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  // change eyeclosed to dsiplay None and eyeopen to display block
}
function showPassword3() {
  var passwordInput = document.getElementById("password2");
  var eyeOpen = document.getElementById("eye-open3");
  var eyeClosed = document.getElementById("eye-closed3");
  // Toggle the input type between 'password' and 'text'
  if (passwordInput.type === "password") {
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  } else {
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  }
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  // change eyeclosed to dsiplay None and eyeopen to display block
}