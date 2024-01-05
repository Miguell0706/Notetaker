//This function is to get a random quote
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
  quoteElement.textContent = quote;
});
//This function is to show and hide the password
function showPassword() {
    var passwordInput = document.getElementById('password');
    var eyeOpen = document.getElementById('eye-open');
    var eyeClosed = document.getElementById('eye-closed');
    // Toggle the input type between 'password' and 'text'
    if (passwordInput.type === 'password') {
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
    else {
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    }
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
    // change eyeclosed to dsiplay None and eyeopen to display block
}