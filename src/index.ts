import "./styles/index.scss";

import log from "./utils/logger";

import "./core/block";
import {modules} from "./core/modules";
import {filter} from "./core/filtering";

import "./core/updateCheck";

log("🍊⚓ Initializing DCRefresher Reborn.");

const loadStart = performance.now();

const context = require.context("./modules/", true, /\.ts$/);

Promise.all(context.keys().map((v) => modules.load(context(v).default)))
    .then(() => {
        log(
            `🍊✔️ DCRefresher Reborn Module Loaded. took ${(
                performance.now() - loadStart
            ).toFixed(2)}ms.`
        );

        filter.run();
    });

window.addEventListener("load", filter.run);