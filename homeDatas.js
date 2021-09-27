
async function getHomeDatas() {
    const ltcApi = "https://rbstr.herokuapp.com/home/datas";

	const res = await fetch(ltcApi);
    const data = await res.json();
    console.log(data)
    if (!data) {
        return {text: "Sorry, Api is down :-( "};
    } else {
    console.log(data)
    return data
    }
}

export default getHomeDatas;
