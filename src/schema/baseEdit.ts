import { base } from "./base";
import { system } from "./system";

export class baseEdit<T> extends base<T>{
    constructor(schema: any, system: system) {
        super(system, schema)
    }
}