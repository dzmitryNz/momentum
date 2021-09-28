const url = "https://quote-garden.herokuapp.com/api/v3/quotes/random",
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption');

export async function getQuote() {
    const res = await fetch(url);
    const data = await res.json();
    if (data.statusCode !== 200) {
        blockquote.textContent = `" Sorry, Quote service is down "`;
    figcaption.textContent = `- code author`;
    } else {
    // console.log(data)
    blockquote.textContent = `" ${ data.data[0].quoteText } "`;
    figcaption.textContent = `- ${ data.data[0].quoteAuthor }`;}
};
