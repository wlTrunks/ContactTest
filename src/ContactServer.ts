import "reflect-metadata";
import {inject, injectable} from "inversify";
import * as express from 'express';
import {Application} from 'express';
import * as bodyParser from 'body-parser';
import {Controller} from "./route/controller.interface";
import {DataBase} from "./db/DataBase";
import {TYPES} from "./di/type";

@injectable()
export class ContactServer {

    public express: Application;

    constructor(@inject(TYPES.RouteController) controller: Controller,
                @inject(TYPES.DB) db: DataBase) {
        this.express = express();
        this.setupApp(controller)
    }

    private setupApp(controller) {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use('/api', controller.router);
    }

    public listen(port: number) {
        this.express.listen(port, () => {
            console.log(`Port listening: ${port}`);
        })
    }
}
