const puppeteer = require('puppeteer');
const testPage = require('./testPage');
const insertData = require('./excelHelpers');


const testWebPage = async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	const result = await testPage(page);

	await browser.close();
	return result;

};

async function test() {
	results = await testWebPage();
	console.log('results: ' + results);
	insertData(avgResult);
};

test();