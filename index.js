const { crawlPage } = require("./crawl");


function main(){

    //@dev length of argv array must be 2 so if we send something then it must be 3 or more
    if(process.argv.length < 3){
        console.log('no website has given');
        process.exit(1);
    }

    if(process.argv.length > 3){
        console.log('too many arguments');
        process.exit(1);
    }

    //@dev here always an argv contains array which 
    //@dev at 0: there is absoulte path of node
    //@dev at 1: abosulute path of current file
    //@dev at 2: argument that we have sent in cli
    const website_url = process.argv[2];
    console.log(`start crawling of website ${website_url}`);
    crawlPage(website_url);

}

main();