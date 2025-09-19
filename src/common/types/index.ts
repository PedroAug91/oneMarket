export type ResponseData = Record<string | number | symbol, unknown>;

export interface ResponseSchema {
    success: boolean;
    message: string;
    data: object | null;
}

import type { Insertable, Selectable, Updateable } from "kysely";

import type { DB } from "./db.js";

export type Table = keyof DB;

export type SelectableUser = Selectable<DB["users"]>;
export type InsertableUser = Insertable<DB["users"]>;
export type UpdateableUser = Updateable<DB["users"]>;
