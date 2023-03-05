

export default class ControllerClass {
    config: object | any;

    /**
     * 
     * @param {{
     *      config: object | any;
     * }}options
     */
    constructor(options: {
        config: object | any;
    }) {
        this.config = options.config;
    }
}