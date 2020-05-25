import {Contact} from "../model/Contact";

export interface ResponseProcessor {
    getByName(name: string): Promise<Contact[]>

    addContact(body: any): Promise<string>

    updateByName(body: any): Promise<string>

    getAllContact(): Promise<Contact[]>

    deleteById(id: number): Promise<string>

    deleteAll(): Promise<string>

    deleteByName(name: string): Promise<string>
}