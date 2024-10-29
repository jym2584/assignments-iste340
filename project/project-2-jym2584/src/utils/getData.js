// Proxy servers
// https://solace.ist.rit.edu/~dsbics/proxy/
// https://people.rit.edu/~dsbics/proxy/
const proxyServer = "https://solace.ist.rit.edu/~dsbics/proxy/"
const iSchoolApiUrl = "https://ischool.gccis.rit.edu/api"
const apiUrl = `${proxyServer}${iSchoolApiUrl}/`

// endpoint would be something like about/ or degrees/
async function getData(endpoint) {
    const response = await fetch(`${apiUrl}${endpoint}`);
    return await response.json();
}

export default getData;