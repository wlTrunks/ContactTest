import {inject, injectable} from "inversify";
import "reflect-metadata";
import {Request, Response, Router} from 'express';
import * as express from 'express';
import {Controller} from "./controller.interface";
import {ResponseProcessor} from "./ResponseProcessor";
import {TYPES} from "../di/type";

@injectable()
class ContactController implements Controller {
    private path = '/contacts';
    router = Router;
    private processor: ResponseProcessor

    constructor(@inject(TYPES.ResponseProcessor) processor: ResponseProcessor) {
        this.router = express.Router();
        this.processor = processor;
        this.setRoutes();
    }


    private setRoutes() {
        this.router.get(`${this.path}/all`, this.getAllContact);
        this.router.get(`${this.path}/getByName/:name`, this.getContactByName);
        this.router.delete(`${this.path}/deleteById/:id`, this.deleteById);
        this.router.delete(`${this.path}/deleteAll`, this.deleteAll);
        this.router.delete(`${this.path}/deleteByName/:name`, this.deleteByName);
        this.router.put(`${this.path}/updateByName`, this.updateByName);
        this.router.put(`${this.path}/updateById`, this.updateById);
        this.router.post(`${this.path}/add`, this.addContact);
    }

    getContactByName = async (request: Request, response: Response) => {
        response.json(await this.processor.getByName(request.params.name))
    }

    addContact = async (request: Request, response: Response) => {
        response.send(await this.processor.addContact(request.body))
    }

    updateByName = async (request: Request, response: Response) => {
        const answer = await this.processor.updateByName(request.body)
        response.send(answer)
    }

    updateById = async (request: Request, response: Response) => {
        const answer = await this.processor.updateById(request.body)
        response.send(answer)
    }

    getAllContact = async (request: Request, response: Response) => {
        response.send(await this.processor.getAllContact())
    }

    deleteById = async (request: Request, response: Response) => {
        response.send(await this.processor.deleteById(request.params.id))
    }

    deleteByName = async (request: Request, response: Response) => {
        response.send(await this.processor.deleteByName(request.params.name))
    }

    deleteAll = async (request: Request, response: Response) => {
        response.send(await this.processor.deleteAll())
    }
}

export default ContactController
