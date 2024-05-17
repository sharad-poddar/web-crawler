const { normalize_url, get_urls_from_html } = require('../crawl');
const { test, expect } = require('@jest/globals');

test('normalize_url strip_protocols', ()=>{
    const input = 'https://google.com/sharad';
    const actual = normalize_url(input);
    const expected_output = 'google.com/sharad';
    expect(actual).toEqual(expected_output);
})

test('normalize_url no_strip_at_end', ()=>{
    const input = 'https://google.com/sharad/';
    const actual = normalize_url(input);
    const expected_output = 'google.com/sharad';
    expect(actual).toEqual(expected_output);
})

test('normalize_url capitals', ()=>{
    const input = 'https://GOOgle.com/sharad/';
    const actual = normalize_url(input);
    const expected_output = 'google.com/sharad';
    expect(actual).toEqual(expected_output);
})

test('get_urls_from_html absolute url', ()=>{
    //@dev aboslute means completey from the root 

    const inputHTMLbody = `
        <html>
            <body>
                <a href='https://google.com/sharad/'>click on this</a>
            </body>
        </html>
    `;
    const input_url = 'https://google.com/sharad/'
    const actual = get_urls_from_html(inputHTMLbody, input_url);
    const expected_output = ['https://google.com/sharad/'];
    expect(actual).toEqual(expected_output);
})

test('get_urls_from_html relative url', ()=>{
    //@dev aboslute means relative to src or main

    const inputHTMLbody = `
        <html>
            <body>
                <a href='https://google.com/sharad/'>click on this</a>
            </body>
        </html>
    `;
    const input_url = 'https://google.com/sharad/'
    const actual = get_urls_from_html(inputHTMLbody, input_url);
    const expected_output = ['https://google.com/sharad/'];
    expect(actual).toEqual(expected_output);
})

test('get_urls_from_html invalid url', ()=>{
    //@dev aboslute means relative to src or main

    const inputHTMLbody = `
        <html>
            <body>
                <a href='invalid'>click on this</a>
            </body>
        </html>
    `;
    const input_url = 'https://google.com'
    const actual = get_urls_from_html(inputHTMLbody, input_url);
    const expected_output = [];
    expect(actual).toEqual(expected_output);
})