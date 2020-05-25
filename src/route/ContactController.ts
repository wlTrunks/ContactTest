import * as express from 'express';
import {Controller} from "./controller.interface";
import {ResponseProcessor} from "./ResponseProcessor";

class ContactController implements Controller {
    private path = '/contacts';
    router = express.Router();
    private processor: ResponseProcessor

    constructor(processor: ResponseProcessor) {
        this.processor = processor
        this.setRoutes();
    }


    private setRoutes() {
        this.router.get(`${this.path}/all`, this.getAllContact);
        this.router.get(`${this.path}/getByName/:name`, this.getContactById);
        this.router.delete(`${this.path}/deleteById/:id`, this.deleteById);
        this.router.delete(`${this.path}/deleteAll`, this.deleteAll);
        this.router.delete(`${this.path}/deleteByName/:name`, this.deleteByName);
        this.router.put(`${this.path}/updateByName`, this.updateByName);
        this.router.post(`${this.path}/add`, this.addContact);
    }

    getContactById = async (request: express.Request, response: express.Response) => {
        response.json(await this.processor.getByName(request.params.name))
    }

    addContact = async (request: express.Request, response: express.Response) => {
        response.send(await this.processor.addContact(request.body))
    }

    updateByName = async (request: express.Request, response: express.Response) => {
        const answer = await this.processor.updateByName(request.body)
        response.send(answer)
    }

    getAllContact = async (request: express.Request, response: express.Response) => {
        response.send(await this.processor.getAllContact())
    }

    deleteById = async (request: express.Request, response: express.Response) => {
        response.send(await this.processor.deleteById(request.params.id))
    }

    deleteByName = async (request: express.Request, response: express.Response) => {
        response.send(await this.processor.deleteByName(request.params.name))
    }

    deleteAll = async (request: express.Request, response: express.Response) => {
        response.send(await this.processor.deleteAll())
    }
}

export default ContactController
