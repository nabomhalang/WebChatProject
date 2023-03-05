import { NextFunction } from "express";
import ControllerClass from "../interfaces/controllers.interface.js";
import mysql, { Pool } from 'mysql';

export default class MysqlConn extends ControllerClass {
    config: object | string[];
    sql: Pool;

    constructor(options: {
        config: object | string[],
        sql: Pool
    }) {
        super({ config: options.config });
        this.sql = options.sql;
    }

    init(user: string, pass: string, database: string, callback: NextFunction): void | NextFunction {
        this.config = {
            host: 'mariadb',
            user: user,
            password: pass,
            database: database,
            charset: 'utf8mb4'
        };

        this.sql = mysql.createPool(this.config);

        if (callback) callback(this);
    }

    query<T>(query: string, params?: string[] | object): Promise<T> {
        if (!this.sql) throw new Error("Sql was Wrong...")

        return new Promise<T>((resolve, reject) => {
            this.sql.query(query, params, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}