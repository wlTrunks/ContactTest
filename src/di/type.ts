const TYPES = {
    ResponseProcessor: Symbol.for("ResponseProcessor"),
    Knex: Symbol.for("Knex"),
    DB: Symbol.for("DB"),
    ExpressApp: Symbol.for("ExpressApp"),
    Route: Symbol.for("Route"),
    RouteController: Symbol.for("RouteController"),
    Server: Symbol.for("Server")
};
export {TYPES};