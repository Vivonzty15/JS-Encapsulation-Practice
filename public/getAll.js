// Utility for making multiple fetch requests at the same time
function getAll(...urls) { // rest parameter
    let promises = []
    urls.forEach(url => {
        let promise = fetch(url);
        promises.push(promise.then(res => res.json()))
    })
    return Promise.all(promises)
}