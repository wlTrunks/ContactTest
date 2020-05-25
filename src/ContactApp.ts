import * as express from 'express';
import * as bodyParser from 'body-parser';
import {PostgresDB} from "./db/PostgresDB";
import {Controller} from "./route/controller.interface";

export class ContactApp {

    public express: express.Application;
    private readonly port: number;

    constructor(controller: Controller,
                db: PostgresDB,
                port: number) {
        this.express = express();
        this.port = port;
        this.setupApp(controller)
    }

    private setupApp(controller) {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use('/api', controller.router);
    }

    public listen() {
        this.express.listen(this.port, () => {
            console.log(`Port listening: ${this.port}`);
        })
    }
}
