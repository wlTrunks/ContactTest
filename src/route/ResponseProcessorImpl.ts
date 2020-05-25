import {ResponseProcessor} from "./ResponseProcessor";
import {Contact} from "../model/Contact";


export class ResponseProcessorImpl implements ResponseProcessor {
    async getByName(name: string): Promise<Contact[]> {
        console.log(`id request name ${name}`)
        return Contact.query().where('name', name);
    }

    async addContact(body: any): Promise<string> {
        console.log(body)
        try {
            const contact = await Contact.query().insert(body)
            return `contact added`
        } catch (error) {
            return error.toString()
        }
    }

    async updateByName(body: any): Promise<string> {
        try {
            const contact = await Contact.query()
                .patch({
                    phone: body.phone,
                    email: body.email
                }).where('name', body.name)
            return `Contact ${body.name} updated`
        } catch (error) {
            return error.toString()
        }
    }

    async getAllContact(): Promise<Contact[]> {
        return Contact.query();
    }

    async deleteById(id: number): Promise<string> {
        const deleted = await Contact.query().deleteById(id)
        console.log(`id deleteById ${id} rows ${deleted}`)
        return (deleted > 0) ? "Contact deleted" : "Contact not found";
    }

    async deleteAll(): Promise<string> {
        return `Table Contacts ${await Contact.query().delete()} Cleared`;
    }

    async deleteByName(name: string): Promise<string> {
        console.log(name)
        const deleted = await Contact.query()
            .delete()
            .where('name', name);
        return (deleted > 0) ? "Contact deleted" : "Contact not found";
    }
}