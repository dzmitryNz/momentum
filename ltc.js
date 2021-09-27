
async function getLtc() {
    const ltcApi = "https://api.blockcypher.com/v1/ltc/main/addrs/LVouHfm1BAAUrWGEvcTxcDunk8QmtnR2Dx/full?limit=50?unspentOnly=true&includeScript=true";

	const res = await fetch(ltcApi);
    const data = await res.json();
    console.log(data)
    if (!data) {
        return {text: "Sorry, Api is down :-( "};
    } else {
    const dateNow = new Date();
    console.log(dateNow, data)
    }
}

getLtc();
