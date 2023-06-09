const getApi = async(URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results; 
}

export default {
    getApi
}; 