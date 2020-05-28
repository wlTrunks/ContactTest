import {Container} from "inversify";
import "reflect-metadata";
import db from "../db/knex";
import * as Knex from "knex";
import {DataBase} from "../db/DataBase";
import {TYPES} from "./type";
import {PostgresDB} from "../db/PostgresDB";
import {ResponseProcessorImpl} from "../route/ResponseProcessorImpl";
import {ResponseProcessor} from "../route/ResponseProcessor";
import ContactController from "../route/ContactController";
import {Controller} from "../route/controller.interface";
import {ContactServer} from "../ContactServer";

const container = new Container();
container.bind<Knex>(TYPES.Knex).toConstantValue(db);
container.bind<DataBase>(TYPES.DB).to(PostgresDB);
container.bind<ResponseProcessor>(TYPES.ResponseProcessor).to(ResponseProcessorImpl);

container.bind<Controller>(TYPES.RouteController).to(ContactController);
container.bind<ContactServer>(TYPES.Server).to(ContactServer);
export default container;