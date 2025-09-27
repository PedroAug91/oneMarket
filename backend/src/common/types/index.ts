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

export type SelectableAddress = Selectable<DB["addresses"]>;
export type InsertableAddress = Insertable<DB["addresses"]>;
export type UpdateableAddress = Updateable<DB["addresses"]>;

export type SelectableAvailability = Selectable<DB["availability"]>;
export type InsertableAvailability = Insertable<DB["availability"]>;
export type UpdateableAvailability = Updateable<DB["availability"]>;

export type SelectableBooking = Selectable<DB["bookings"]>;
export type InsertableBooking = Insertable<DB["bookings"]>;
export type UpdateableBooking = Updateable<DB["bookings"]>;

export type SelectableCategory = Selectable<DB["categories"]>;
export type InsertableCategory = Insertable<DB["categories"]>;
export type UpdateableCategory = Updateable<DB["categories"]>;

export type SelectableCategorie_Service = Selectable<DB["categories_services"]>;
export type InsertableCategorie_Service = Insertable<DB["categories_services"]>;
export type UpdateableCategorie_Service = Updateable<DB["categories_services"]>;

export type SelectableCustomer = Selectable<DB["customers"]>;
export type InsertableCustomer = Insertable<DB["customers"]>;
export type UpdateableCustomer = Updateable<DB["customers"]>;

export type SelectableReview = Selectable<DB["reviews"]>;
export type InsertableReview = Insertable<DB["reviews"]>;
export type UpdateableReview = Updateable<DB["reviews"]>;

export type SelectableServiceImage = Selectable<DB["service_images"]>;
export type InsertableServiceImage = Insertable<DB["service_images"]>;
export type UpdateableServiceImage = Updateable<DB["service_images"]>;

export type SelectableServiceProvider = Selectable<DB["service_providers"]>;
export type InsertableServiceProvider = Insertable<DB["service_providers"]>;
export type UpdateableServiceProvider = Updateable<DB["service_providers"]>;

export type SelectableServiceVariation = Selectable<DB["service_variations"]>;
export type InsertableServiceVariation = Insertable<DB["service_variations"]>;
export type UpdateableServiceVariation = Updateable<DB["service_variations"]>;

export type SelectableService = Selectable<DB["services"]>;
export type InsertableService = Insertable<DB["services"]>;
export type UpdateableService = Updateable<DB["services"]>;
