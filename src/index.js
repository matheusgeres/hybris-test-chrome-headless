const puppeteer = require('puppeteer');
const env       = require('./local.env.json');
const customer  = require('./commons/customer');
const product   = require('./commons/product');
const cart      = require('./commons/cart');

(async () => {
  // Abre uma nova instância do Chrome
  const browser      = await puppeteer.launch({
    headless         : env.puppeteer.headless,
    ignoreHTTPSErrors: env.puppeteer.ignoreHTTPSErrors
  });

  // Abre uma nova aba no Chrome
  const page = await browser.newPage();

  // Seta a visualização que será utilizada na página
  await page.setViewport({ width: env.puppeteer.viewPort.width, height: env.puppeteer.viewPort.height});
  
  // Realiza o login do cliente
  await customer.login(env, page);

  // Navega para a categoria Camera Digital Compact
  await product.gotoCategoryCompactCamera(env, page);

  // Adiciona o primeiro item da vitrine
  await product.addFirstProductOfCategory(env, page);

  // Navega para o carrinho
  await cart.gotoCart(env, page);

  // Realiza a compra
  await cart.placeOrder(env, page);
  
  // Realiza um print de como a página está no momento.
  await page.screenshot({ path: "example3.png" });

  // Fecha o Chrome
  await browser.close();
})();
