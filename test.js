const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe, before, it, after } = require('mocha');
const { futimesSync } = require('fs');


let driver

before(async function () {
    driver = await new Builder()
        .forBrowser('chrome')
        // .usingServer('http://169.254.82.231:4444') local
        .usingServer('http://192.168.56.104:4444') //remote//
        .build();
});

describe('Открыть окно логина', function () {
        
    it('Navigate to the web-site', async function () {
        await driver.get('https://qarocks.ru/');
        await driver.manage().window().maximize();
        this.timeout(20000)
        let popup = await driver.findElement(By.css('.uscl-public_popup-main'))
        await driver.wait(until.elementIsVisible(popup))
        await driver.findElement(By.css('.ico_uscl-close')).click();
        let title = await driver.findElement(By.css('h1.site-title a')).getText();
        let home_link = await driver.findElement(By.css('h1 a[href="https://qarocks.ru/"]'))
        assert.notEqual(home_link, null)
        assert.equal("QaRocks", title);
    })
})

describe("Поиск", async function () {
    let pattern = 'selenium'
    it('Types into the search field', async function () {
        search = await driver.findElement(By.css('input.search-field'))
        await search.click()
        await search.sendKeys(pattern, Key.RETURN)
    });
    it('Validate the searching results', async function () {
        let title = await driver.findElement(By.css('#primary h1.page-title')).getText();
        assert.ok(title.includes(pattern));
        let counter = 1
        while (counter < 6) {
            let article = await driver.findElement(By.css('#main article:nth-child(' + counter + ') h2.entry-title')).getText();
            // console.log(article).toLowerCase();
            // console.log(pattern);
            assert.ok(article.toLowerCase().includes(pattern));
            counter +=1
        }
    })

    it('Open an author page', async function () {
        let ref_number = Math.floor(Math.random() * 10) + 1;
        console.log(ref_number)
        let ref = await driver.findElement(By.xpath("//article[" + ref_number + "]//a[@rel='author']"));
        let author = await driver.findElement(By.xpath("//article[" + ref_number + "]//a[@rel='author']/span")).getText();
        await ref.click();
        let author_page = await driver.findElement(By.css('#primary h1.page-title')).getText();
        let author_page_title = "Author name: " + author;
        assert.equal(author_page, author_page_title);
    })
})

after(async function () {
    await driver.quit();
})