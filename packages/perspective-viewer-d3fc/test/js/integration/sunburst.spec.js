/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const path = require("path");

const utils = require("@finos/perspective-test");
const simple_tests = require("@finos/perspective-viewer/test/js/simple_tests.js");

const {withTemplate} = require("./simple-template");
withTemplate("sunburst", "d3_sunburst");

utils.with_server({}, () => {
    describe.page(
        "sunburst.html",
        () => {
            simple_tests.default("skip");

            test.capture("sunburst label shows formatted date", async page => {
                const viewer = await page.$("perspective-viewer");
                await page.shadow_click("perspective-viewer", "#config_button");
                await page.evaluate(element => element.setAttribute("row-pivots", '["Ship Date"]'), viewer);
                await page.evaluate(element => element.setAttribute("columns", '["Sales", "Profit"]'), viewer);
                await page.evaluate(element => element.setAttribute("filters", '[["Product ID", "==", "FUR-BO-10001798"]]'), viewer);
                await page.waitForSelector("perspective-viewer:not([updating])");
            });

            test.capture("sunburst parent button shows formatted date", async page => {
                const viewer = await page.$("perspective-viewer");
                await page.shadow_click("perspective-viewer", "#config_button");
                await page.evaluate(element => element.setAttribute("row-pivots", '["Ship Date", "City"]'), viewer);
                await page.evaluate(element => element.setAttribute("columns", '["Sales", "Profit"]'), viewer);
                await page.evaluate(element => element.setAttribute("filters", '[["Product ID", "==", "FUR-BO-10001798"]]'), viewer);
                await page.waitForSelector("perspective-viewer:not([updating])");
                await page.mouse.click(430, 450);
                await page.waitFor(500);
                await page.mouse.click(430, 450);
                await page.waitFor(500);
            });
        },
        {reload_page: false, root: path.join(__dirname, "..", "..", "..")}
    );
});
