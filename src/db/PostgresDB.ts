import {Model} from "objection";
import * as Knex from "knex";

export class PostgresDB {
    private readonly db: Knex

    constructor(db: Knex) {
        this.db = db;
        this.createTable()
        this.bindModel()
    }

    private async createTable() {
        const table = 'contacts'
        if (await this.db.schema.hasTable(table)) {
            console.log(`createTable hasTable`)
            return;
        }
        await this.db.schema.createTable(table, function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('phone', 10);
            table.string('email');
        });
        console.log(`createTable contacts created`)
    }

    private bindModel() {
        Model.knex(this.db)
    }
}