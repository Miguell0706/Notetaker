async function fetchRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
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
