import {Model} from 'objection';

export class Contact extends Model {
    id: number
    name: string
    phone: string
    email: string

    static tableName = "contacts";

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'phone', 'email'],

            properties: {
                id: {type: 'integer'},
                name: {type: 'string', minLength: 1, maxLength: 255},
                phone: {type: 'string', minLength: 1, maxLength: 10},
                email: {type: 'string', minLength: 1, maxLength: 255},
            }
        };
    }
}
