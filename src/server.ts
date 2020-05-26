import ContactController from "./route/ContactController";
import {PostgresDB} from "./db/PostgresDB";
import {ContactApp} from "./ContactApp";
import {ResponseProcessorImpl} from "./route/ResponseProcessorImpl";
import db from './db/knex';
import {setupWeb} from "./web/web";

const port: number = 3000

const app = new ContactApp(
    new ContactController(new ResponseProcessorImpl()),
    new PostgresDB(db),
    port
);
setupWeb(app.express)

app.listen()

export default app;