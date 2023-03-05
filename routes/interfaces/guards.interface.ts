

import { NextFunction, Request, Response } from 'express';
import { InferType } from 'yup';

/**
 * guards class
 * */
export default class GuardsClass {
    execute: (req?: Request, res?: Response, next?: NextFunction, scheme?: InferType<any>) => Promise<Response> | void;

    /**
     * 
     * @param {{
     *     execute: (req?: Request, res?: Response, next?: NextFunction, scheme?: InferType<any>) => Promise<Response> | void;
     * }}options
     */
    constructor(options: {
        execute: (req?: Request, res?: Response, next?: NextFunction, scheme?: InferType<any>) => Promise<Response> | void;
    }) {
        this.execute = options.execute;
    }
}