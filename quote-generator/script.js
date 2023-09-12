// dynamically add desired text
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote-btn');
const loader = document.getElementById('loader');


// Get Quote from API
let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes Array
    chosenQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author is blank and replace with unknown
    if (!chosenQuote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = chosenQuote.author;
    }
// check quote length in order to determine styling
if (chosenQuote.text.length > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// set quote and hide loader
    quoteText.textContent = chosenQuote.text;
    complete();

}

async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
//    attempt to do a fetch request if does not work, catch the error info
    try {
        const response = await fetch(apiURL); /*this will not assign until a response*/
        apiQuotes = await response.json(); /*turn into a json object and pass into global variable */
        newQuote();
    } catch (error) {
        // error handling pass into alert, UI element etc
    }
}
// if local array then can comment out the apiQuotes and the getQuotes function can just change the chosenQuote to pull from localQuotes instead. (or if the API goes down) would also load much faster of course. (can also use https://zenquotes.io/api/quotes)




// Tweet a quote on X. use back ticks not single quotes

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners genreally go at the bottom
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
