const quoteContainer = document.getElementById("quote-container");
const quoteText =document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn =document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loaderを出す
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loaderを隠す
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // 著者が不明な時は'Unkown'にする
  if(!quote.author) {
    authorText.textContent = 'Unknown';
  }
  else {
    authorText.textContent = quote.author;
  }
  // 文章の長さでStyleを定義
  if(quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  }
  else {
    quoteText.classList.remove('long-quote');
  }
  // Set QuoteしてLoaderを隠す
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes =await response.json();
    newQuote();
  }
  catch(error) {

    ;
    // エラーが出た時

  }
}

// Tweetする
function tweetQuote() {
  const twitterUrl = `https: // twitter.com/intent/tweet?text=Today's Quote: ${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);
// 実行
getQuotes();
