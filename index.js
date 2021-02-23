'use strict';

const apiKey = 'hyvLmapUStPIF3F9X89k1jgkltYXM78QjdbMpysy';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkData(query, maxResults) {
    const params = {
        q: query,
        maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson =>
            displayParkData(responseJson, maxResults))
        .catch(error => alert('Something went wrong :('));
        console.log(query);

}

function displayParkData(responseJson, maxResults){
    console.log(responseJson);
    let results = [];
    for (let i = 0; i < maxResults; i++) {
        results.push(
            `<div class=group>
                <div class="item">
                    <h1>${responseJson.data[i].fullName}</h1>
                </div>
                 <div class="item">
                    <h3>${responseJson.data[i].description}</h3>
                 </div>
                 <div class ="item">
                    <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
                </div>
            </div>`)
            $('.results').html(results);
            $('.section').removeClass('hidden');
    }
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getParkData(searchTerm, maxResults);
    });
  }
  
  $(watchForm);