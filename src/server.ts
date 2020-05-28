import {ContactServer} from "./ContactServer";
import container from "./di/inversify.config";
import {setupWeb} from "./web/web";
import {TYPES} from "./di/type";

const port: number = 3000

const server = container.get<ContactServer>(TYPES.Server);
setupWeb(server.express)

server.listen(port)

export default server;