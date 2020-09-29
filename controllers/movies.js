const request = require('request');
const token = process.env.API_KEY;
const rootURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + token + '&query=';

module.exports = {
    movieSearch
};

function movieSearch(req, res) {
    const search = req.query.search;
    const baseURL = rootURL + search + '&page=';

    let allResults = [];
    let resultIds = [];
    let page = 1;

    gatherMovies();

    function gatherMovies() {
        request(baseURL + page, function (err, response, body) {
            const testing = JSON.parse(body);
            testing.results.forEach(function (r) {
                if (r.genre_ids.includes(878) && !resultIds.includes(r.id)) {
                    allResults.push(r);
                    resultIds.push(r.id);
                }
                else return;
            })
            if (testing.page <= testing.total_pages) {
                gatherMovies();
            } else {
                res.render('movies', { allResults: allResults, user: req.user })
            }
            page++;
        })
    }
}



    // function movieSearch(req, res) {
    //     const search = req.query.search;
    //     const searchURL = rootURL + search;


    //     request(searchURL, function (err, response, body) {
    //         console.log(JSON.parse(body))

    //         const baseURL = searchURL + '&page='

    //         let allResults = [];
    //         let resultsIds = [];
    //         let page = 1;


    //         gatherMovies();

    //         function gatherMovies() {
    //             request(searchURL + '&page=' + page, function (err, response, body) {
    //                 const testing = JSON.parse(body);
    //                 testing.results.forEach(function (r) {
    //                     if (r.genre_ids.includes(878) && !resultsIds.includes(r.id)) {
    //                         allResults.push(r);
    //                         resultsIds.push(r.id);
    //                     }
    //                     else return;
    //                 })
    //                 if (testing.page <= testing.total_pages) {
    //                     gatherMovies();
    //                 } else {
    //                     res.render('movies', { allResults: allResults, user: req.user })
    //                 }
    //                 page++;
    //             })
    //         }
    //     })




    // const search = req.query.search;
    // const searchURL = rootURL + search;

    // var allResults = [];
    // request(searchURL, function (err, response, body) {
    //     const movies = JSON.parse(body);
    //     console.log(movies.total_results);
    //     iterateThrough();

    //     function iterateThrough() {
    //         for (var i = movies.page; i <= movies.total_pages; i++) {
    //             const newURL = searchURL + '&page=' + i;
    //             request(newURL, function (err, respsonse, body) {
    //                 const testing = JSON.parse(body);
    //                 testing.results.forEach(function (r) {
    //                     allResults.push(r);
    //                 })
    //                 console.log(allResults.length)
    //             })
    //         }
    //     }

    //     console.log(allResults.length)

    // })
    // res.render('movies', { allResults: allResults, user: req.user });
