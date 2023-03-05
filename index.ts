

import express, { Application } from "express";
import prepare from "./routes/index.js";

const app: Application = express(), port = 3000;

prepare(app).then(() => {
    app.listen(port, "0.0.0.0", () => {
        console.log(`listening on port ${port}`);
    });
});