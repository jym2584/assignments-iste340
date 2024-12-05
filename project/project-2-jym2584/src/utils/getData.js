// Proxy servers
// https://solace.ist.rit.edu/~dsbics/proxy/
// https://people.rit.edu/~dsbics/proxy/
// Personal proxy server: "https://apcekwbz63.execute-api.us-east-2.amazonaws.com/iste340/proxy?url="
const proxyServer = "https://people.rit.edu/~dsbics/proxy/"
const iSchoolApiUrl = "https://ischool.gccis.rit.edu/api"
const apiUrl = `${proxyServer}${iSchoolApiUrl}/`

// endpoint would be something like about/ or degrees/
async function getData(endpoint) {
    const response = await fetch(`${apiUrl}${endpoint}`);
    return await response.json();
}

export default getData;