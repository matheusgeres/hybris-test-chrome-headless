exports.gotoCart = async function (env, page) {
  const path = '/keyruswarmupstorefront/electronics/en/cart';
  await page.goto(`${env.baseUrl}${path}`, { waitUntil: env.goto.waitUntil });
}

exports.placeOrder = async function (env, page) {
  // Navega para o carrinho
  await Promise.all([
    page.click(".btn--continue-checkout"),
    page.waitForNavigation({ waitUntil: env.goto.waitUntil })
  ]);

  // Seleciona para usar um endereço previamente cadastrado
  await page.click('.js-address-book');

  // Seleciona o endereço previamente cadastrado
  await page.click('.addressEntry button[type=submit]');
  await page.waitFor(500);

  // Avança para a etapa de pagamento
  await page.click('#deliveryMethodSubmit');
  await page.waitFor(500);

  // Preenche os dados do cartão de crédito
  await page.select("#card_cardType", "001");
  await page.type("#card_nameOnCard", env.card.accountHolderName);
  await page.type("#card_accountNumber", env.card.cardNumber);
  await page.select("#ExpiryMonth", env.card.expiryMonth);
  await page.type("#ExpiryYear", env.card.expiryYear);
  await page.type("#card_cvNumber", env.card.verificationNumber);
  await page.click(".checkout-next");
  await page.waitFor(500);

  // Aceita os termos e condições de compra
  await page.click("#Terms1");

  // Realiza o pedido
  await page.click("#placeOrder");
}