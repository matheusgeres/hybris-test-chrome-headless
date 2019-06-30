exports.gotoCategoryCompactCamera = async function(env, page) {
  const path = '/keyruswarmupstorefront/electronics/en/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/c/576';
  await page.goto(`${env.baseUrl}${path}`, { waitUntil: env.goto.waitUntil }); // wait until page load
}

exports.addFirstProductOfCategory = async function(env, page){
  await Promise.all([
    page.click(".product__list .product__list--item:nth-child(1) button[type=submit]"),
    page.waitFor(500)
  ]);
  await closeBox(page);
}

async function closeBox(page){
  await page.click("#cboxClose");
}