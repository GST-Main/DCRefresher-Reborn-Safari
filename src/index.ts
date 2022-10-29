import "./styles/index.scss";

import log from "./utils/logger";

import "./core/block";
import {modules} from "./core/modules";
import {filter} from "./core/filtering";

import "./core/updateCheck";

(() => {
    log("🍊⚓ Initializing DCRefresher Reborn.");

    const loadStart = performance.now();

    const context = require.context("./modules/", true, /\.ts$/);

    Promise.all(context.keys().map((v: string) => context(v).default))
        .then((v: RefresherModule[]) => modules.load(...v))
        .then(async () => {
            log(
                `🍊✔️ DCRefresher Reborn Module Loaded. took ${(
                    performance.now() - loadStart
                ).toFixed(2)}ms.`
            );

            filter.run();
        });

    window.addEventListener("load", async () => {
        filter.run();
    });
})();