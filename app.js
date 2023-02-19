const puppeteer = require('puppeteer');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

let data;
let containsURL;

(async () => {
    const browser = await puppeteer.launch({ headless: false, userDataDir: config.userDataDir, args: ['--no-sandbox'], executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome'});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    
    page.on('request', (req) => {
        if(req.resourceType() == 'image' || req.resourceType() == 'video' || req.resourceType() == 'font'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    await page.goto('https://www.messenger.com/t/' + config.messageThreadId);
    
    await page.waitForSelector('.xxooi2h');
    await page.click(".xxooi2h");

    setTimeout(async () => {
        try
        {
            const button = await page.$x(`//span[text()="Multimedia i pliki"]`);
            await button[0].click();    
        
            const span = await page.$x(`//span[text()="Multimedia"]`);
            await span[0].click();
        }
        catch
        {
            console.log("Exception.");
        }
    }, 1000)

    await page.waitForXPath(`//a[@aria-label="Otwórz zdjęcie"]`);
    let multimediaImages = await page.$x(`//a[@aria-label="Otwórz zdjęcie"]`);
    
    await multimediaImages[0].click();

    setTimeout(() => {
        setInterval(async () => {
            const nextButton = await page.waitForSelector('div[aria-label="Następne zdjęcie"]');

            let imgsrc = await page.evaluate(() => {
                try
                {
                    const file = document.querySelector('img.x4ju7c5.xt7dq6l.x14atkfc.x193iq5w') == null ? document.querySelector('video.x1lliihq.x5yr21d.xh8yej3') : document.querySelector('img.x4ju7c5.xt7dq6l.x14atkfc.x193iq5w');
                    return file.src;
                }
                catch
                {
                    return 'null'
                }
            });

            if(fs.existsSync('images.txt'))
            {
                data = fs.readFileSync('images.txt', 'utf-8');
                containsURL = data.includes(imgsrc);
            }

            if(!containsURL)
                fs.appendFileSync('images.txt', '\n' + imgsrc);
            
            await nextButton.click();
        }, 100);
    
    }, 1500);
})();