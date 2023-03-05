

import express from "express"
import MysqlConn from "../../controllers/db.controllers"

declare global {
    namespace Express {
        interface Request {
            mysql: MysqlConn
        }
    }
}