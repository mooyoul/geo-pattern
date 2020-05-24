import "webdriverio";

import { expect } from "chai";
import { readFixture, toPNG } from "../helper";

// tslint:disable
type ExecuteCallback = (...args: any[]) => void;
function waitForReady(done: ExecuteCallback) {
  if (document.readyState !== "loading") {
    done();
  } else {
    document.addEventListener("DOMContentLoaded", done);
  }
}

function waitForResult(done: ExecuteCallback) {
  function loop() {
    var res = (window as any).__result;

    if (res.error) {
      done({
        error: res.error.stack || res.error.message || res.error,
        data: null,
      });
    } else if (res.data) {
      done({
        error: null,
        data: res.data,
      });
    } else {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
}
// tslint:enable

// Quick & Dirty workaround for Edge
// @see https://github.com/webdriverio/webdriverio/issues/3324
async function setValue(selector: string, value: string) {
  const isEdge = /edge/i.test(browser.capabilities.browserName!);
  if (isEdge) {
    // tslint:disable
    await browser.execute(function(s, v) {
      var el = document.querySelector(s);
      el.value = v;
    }, selector, value);
    // tslint:enable
  } else {
    const $el = await $(selector);
    await $el.setValue(value);
  }
}

describe("geo-pattern Browser E2E", () => {
  const builds = (() => {
    const browserName = browser.capabilities.browserName?.toLowerCase() ?? "unknown";
    const isIE = ["ie", "internet explorer"].includes(browserName);
    const isChrome = /chrome/i.test(browserName);
    const isMobile = Object.prototype.hasOwnProperty.call(browser.capabilities, "real_mobile");

    const base = isIE ? "es5" : "es6";

    const collection = [base];

    if (isChrome && !isMobile) {
      collection.push("native");
    }

    const baseUrl = isMobile ? "http://bs-local.com:8080" : "";

    return collection.map((name) => ({
      name,
      url: `${baseUrl}/integration-test/browser/${name}.html`,
    }));
  })();

  for (const build of builds) {
    context(`with ${build.name} build`, () => {
      let browserId: string;
      beforeEach(async () => {
        browserId = [
          browser.capabilities.browserName ?? "Unknown",
          browser.capabilities.deviceName ?? "Unknown",
          browser.capabilities.browserVersion ?? "Latest",
        ].map((token) => token.replace(/[\s-_]+/g, "_").toLowerCase()).join("-");

        await browser.setTimeout({ script: 15000 }); // 15 sec
        await browser.url(build.url);
        await browser.executeAsync(waitForReady);

        await setValue("#input", "fake");
      });

      it("should generate pattern", async () => {
        const $submit = await $("#submit");
        await $submit.click();

        const { error, data } = await browser.executeAsync(waitForResult);

        expect(error).to.eq(null);
        const actual = await toPNG(data);
        const expected = await readFixture("basic.svg");
        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: `browser-${browserId}-${build.name}-basic`,
            dir: "output",
          },
        });
      });

      it("should generate pattern with color", async () => {
        await setValue("#color", "#fc0");

        const $submit = await $("#submit");
        await $submit.click();

        const { error, data } = await browser.executeAsync(waitForResult);

        expect(error).to.eq(null);
        const actual = await toPNG(data);
        const expected = await readFixture("with-color.svg");
        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: `browser-${browserId}-${build.name}-with-color`,
            dir: "output",
          },
        });
      });

      it("should generate pattern with base color", async () => {
        await setValue("#color", "#fc0");

        const $isBaseColor = await $("#is-base-color");
        await $isBaseColor.click();

        const $submit = await $("#submit");
        await $submit.click();

        const { error, data } = await browser.executeAsync(waitForResult);

        expect(error).to.eq(null);
        const actual = await toPNG(data);
        const expected = await readFixture("with-base-color.svg");
        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: `browser-${browserId}-${build.name}-with-base-color`,
            dir: "output",
          },
        });
      });
    });
  }
});
