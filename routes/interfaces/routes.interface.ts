

import express from 'express';

/**
 * abstract class routes
 * @abstract 
 */
export default abstract class Routes {
    app: express.Application

    constructor(options: {
        app: express.Application
    }) {
        this.app = options.app
    }

    setApp(app: express.Application): void {
        this.app = app
    }
}