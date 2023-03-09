

import HandlersClass from './interfaces/handlers.interface.js';
import path from 'path';
import MysqlConn from './controllers/db.controllers.js';
import validate from "./guards/validator.guards.js";
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response, Router } from 'express';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { InferType } from 'yup';

export default async function prepare(app: Application): Promise<void> {
    const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

    const mysql = new MysqlConn({ config: null, sql: null });

    await new Promise((resolve, reject) => {
        mysql.init(process.env.DB_USER, process.env.DB_PASSWORD, "genshin", async () => {
            await mysql.query<string>("SHOW TABLES LIKE \"USER\"").then(async (r: any) => {
                if (!r || (r && !r.length)) {
                    await mysql.query("CREATE TABLE USER (UUID VARCHAR(64) PRIMARY KEY, userEmail VARCHAR(256), userID VARCHAR(64) UNIQUE, userPW VARCHAR(64), userName VARCHAR(32), userAvatar VARCHAR(512), userBD VARCHAR(32), userSEX INT, userVerified INT DEFAULT 0)")
                        .then(async (r: any) => console.log(`Create USER table`))
                        .catch(e => reject(e));
                }
            }).catch(e => reject(e))
            resolve(0);
        });
    })

    app.disable("x-powered");

    app.use((req: Request, res: Response, next: NextFunction) => {
        req.mysql = mysql;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            return res.send(null);
        }

        next();
    });

    app.use(express.json());

    const handlers: string[] = readdirSync(path.join(__dirname, "handlers/")) as string[]
    for (const name of handlers) {
        const handler: HandlersClass = (await import(path.join(__dirname, `handlers/${name}`))).default as HandlersClass;
        const router = Router();

        if (handler?.get)
            router.get(handler.path, handler.get)
        if (handler?.scheme)
            router.post(handler.path, (req: Request, res: Response, next: NextFunction) => validate.execute(req as Request, res as Response, next as NextFunction, handler.scheme as InferType<any>), handler.post)
        else if (handler?.post)
            router.post(handler.path, handler.post)

        app.use('/api', router);
    }

    app.use((req: Request, res: Response, next: NextFunction) => {
        return res.status(404).json({
            c: 404,
            d: "Not Found",
        });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(`err: ${err}`)
        if (!res.headersSent) {
            return res.status(500).json({
                c: 500,
                d: "Internal Server Error",
            })
        }
    });
}