import { NextFunction, Request, Response } from "express";
import GuardsClass from "../interfaces/guards.interface.js";
import { InferType } from "yup";

export default new GuardsClass({
    execute: (req: Request, res: Response, next: NextFunction, scheme: InferType<any>) => {
        scheme.validate(req.body).then((v: any) => {
            // console.log(v)
            req.body = v;
            next();
        }, (_: any) => {
            return res.status(400).json({
                c: 400,
                d: "Bad Request"
            });
        });
    }
})