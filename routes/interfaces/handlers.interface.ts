

import { NextFunction, Request, Response } from 'express';
import { InferType } from 'yup'

/**
 * handlers class
 */
export default class HandlersClass {
    path: string;
    scheme?: InferType<any>;
    post?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;
    get?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;

    /**
     * 
     * @param {{
     *     path: string
     *     scheme?: InferType<any>
     *     post?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;
     *     get?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;
     * }}options
     */
    constructor(options: {
        path: string;
        scheme?: InferType<any>;
        post?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;
        get?: (req?: Request, res?: Response, next?: NextFunction) => Promise<any>;
    }) {
        this.path = options.path;
        this.scheme = options.scheme ?? undefined;
        this.post = options.post ?? undefined;
        this.get = options.get ?? undefined;
    }
}