const { JSDOM } = require('jsdom')


async function crawlPage(website_url){
    console.log('actively crawling', website_url);
    
    let normalize_website_url = normalize_url(website_url);
    console.log('normalize_url is working', normalize_website_url);
    full_url = 'http://' + normalize_website_url;

    const data = await fetch(full_url);

    contentType = data.headers.get('content-type');
    if(!contentType.includes('text/html')){
        console.log('content is not of type html or text');
        return;
    }

    const data_text = await data.text();
    
    const all_website_urls = get_urls_from_html(data_text, full_url);

    // getting all the urls from websites
    console.log(all_website_urls);

}


function get_urls_from_html(htmlBody, baseUrl){
    const urls = [];

    //@dev JSDOM is library used to get the dom's property on any html codebase
    const dom = new JSDOM(htmlBody);
    const linkElemets = dom.window.document.querySelectorAll('a');
    
    for(const linkElement of linkElemets){
        try{
            const urlObj = new URL(linkElement.href);
            if(urlObj.href.slice(0, 1) === '/'){
                // relative url
                urlObj = new URL(new URL(baseUrl).hostname + urlObj.href);
            }
            urls.push(urlObj.href);
        }catch(error){
            continue;
        }
    }
    return urls;
}

function normalize_url(website_url){
    const new_website_url = website_url.toString().toLowerCase();
    const url_convert = new URL(new_website_url);
    const no_protocol_url = url_convert.hostname + url_convert.pathname;
    
    // returning expcet '/' in last and no protocol
    if(no_protocol_url.length > 0 && no_protocol_url.slice(-1) == '/'){
        return no_protocol_url.slice(0, -1);
    }
    return no_protocol_url;
}

module.exports = { 
    normalize_url,
    get_urls_from_html,
    crawlPage
}