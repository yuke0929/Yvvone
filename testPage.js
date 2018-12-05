
async function testPage(page) {


  await page.goto('https://mail.163.com');
  await page.waitForNavigation();

  //login
  await page.type('#auto-id-1544016411746', 'sundiqing2');
  await page.type('#auto-id-1544016411721', '760929');
  await page.click('#dologin');
  await page.setDefaultNavigationTimeout(100000);
  await page.waitForNavigation();

  //trace
  // await page.tracing.start({
  //   path: './trace.json'
  // // });
  // await page.goto('https://qacand.lab-rot.ondemand.com/sf/home?bplte_company=PLTTODO&_s.crb=tJu7fAgOTwcJEHslZiHuRd%2fST9s%3d#Shell-home');
  // await page.waitFor(7000);
  // await page.tracing.stop();
  // await page.screenshot({
  //   path: 'example.png'
  // });
  // await page.pdf({path: 'page.pdf', format: 'A4', printBackground: true});


  let result = page.content();
  return result;
}
module.exports = testPage;