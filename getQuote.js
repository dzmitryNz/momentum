import { en, ru } from "./dict.js";

const url = "https://quote-garden.herokuapp.com/api/v3/quotes/random",
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption');
  language = en;

export async function getQuote() {
    const res = await fetch(url);
    const data = await res.json();
    if (data.statusCode !== 200) {
        blockquote.textContent = language.quoteError[0];
    figcaption.textContent = language.quoteError[1];
    } else {
    // console.log(data)
    blockquote.textContent = `" ${ data.data[0].quoteText } "`;
    figcaption.textContent = `- ${ data.data[0].quoteAuthor }`;}
};
