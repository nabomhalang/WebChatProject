

import HandlersClass from "../interfaces/handlers.interface.js";
import { number, object } from "yup";
import { NextFunction, Response, Request } from "express";
import axios from 'axios';

export default new HandlersClass({
    get: async (req: Request, res: Response, next: NextFunction) => {
        return res.send("uid")
    },
    post: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const Unauthorized = () => {
            return res.status(401).json({
                c: 401,
                d: "Unauthorized",
                e: "잘못된 UID입니다."
            });
        }

        const { uid } = req.body;

        const ajax = axios.create({
            baseURL: "https://enka.network/"
        })

        const response = await ajax.get(`/api/uid/${uid}/`).then((response) => { return JSON.stringify(response.data, null, "\t") })

        return res.status(200).json({
            c: 200,
            d: JSON.stringify(response)
        });
    },
    path: "/uid/:uid",
    scheme: object({
        uid: number().required()
    })
})