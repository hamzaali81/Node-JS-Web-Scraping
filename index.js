const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');

const movie = 'https://www.imdb.com/title/tt13640670/?ref_=hm_fanfav_tt_i_12_pd_fp1';


(async () => {
    let imdbData = [];
    const response = axios.get(movie, {
        headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9"
        },
        gzip: true
    });
    let $ = cheerio.load(response);
    // web data
    let title =  $('div[class="sc-94726ce4-2 khmuX"] > h1').text().trim();
    // $('div[class="sc-f6306ea-0 cNGXvE rating-bar__base-button"] > h1').text().trim()


    imdbData.push({
        title,
        // rating,
        // summary,
        // releaseData
    });

    const j2cp = new Parser();
    const csv = j2cp.parse(imdbData);

    fs.writeFileSync("./imdb.csv", csv,"utf-8")
}) ();