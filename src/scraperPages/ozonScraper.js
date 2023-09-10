export default {

  url: 'https://www.ozon.ru/category/shtory-i-zhalyuzi-15073/',

  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
  },
}
