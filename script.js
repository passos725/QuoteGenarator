const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

//Mostrar o carregamento

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote() {
    loading();
    //Pegar uma menção aleatória da array da api
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Checar se o campo do autor esta vazio e substitui por nenhum
    if (!quote.author) {
        authorText.textContent = "Desconhecido"
    } else {
        authorText.textContent = quote.author;
    }

    // Checar o tamando da menção para determinar a estilização

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }


    quoteText.textContent = quote.text;

    complete();

}

// Pega as menções da api 

async function getQuotes() {
    loading()

    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {

    }
}


// Menção twitter

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Eventos

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();