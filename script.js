const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

const getQuote = async () => {
    showLoadingSpinner();

    const proxyUrl = 'https://lit-eyrie-28589.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }   else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
       
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}' - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load

getQuote();