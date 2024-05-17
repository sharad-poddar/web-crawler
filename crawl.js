const { JSDOM } = require('jsdom')


async function crawlPage(currentUrl){
    console.log('actively crawling', currentUrl);
    
    let rightUrl = normalize_url(currentUrl);
    console.log('normalize_url is working', rightUrl);
    rightUrl = 'http://' + rightUrl;

    const data = await fetch(rightUrl);
    console.log(await data.text());
    
    //@issue
    const baseUrl = get_urls_from_html(data, rightUrl);
    console.log(baseUrl);

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

function normalize_url(url_string){
    const url_stringg = url_string.toString().toLowerCase();
    const url_convert = new URL(url_stringg);
    const no_protocol = url_convert.hostname + url_convert.pathname;
    
    // returning expcet '/' in last and no protocol
    if(no_protocol.length > 0 && no_protocol.slice(-1) == '/'){
        return no_protocol.slice(0, -1);
    }
    return no_protocol;
}

module.exports = { 
    normalize_url,
    get_urls_from_html,
    crawlPage
}