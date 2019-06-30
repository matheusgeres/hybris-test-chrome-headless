exports.login = async function(env, page){
    const path = '/keyruswarmupstorefront/electronics/en/login';
    await page.goto(`${env.baseUrl}${path}`, env.goto.waitUntil); // wait until page load
    await page.type("#j_username", env.credentials.username);
    await page.type("#j_password", env.credentials.password);

    // click and wait for navigation
    await Promise.all([
        page.click("button[type=submit].btn-block"),
        page.waitForNavigation({ waitUntil: env.goto.waitUntil })
    ]);
}