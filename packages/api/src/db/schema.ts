import {
	timestamp,
	text,
	date,
	varchar,
	integer,
	pgTable,
} from "drizzle-orm/pg-core";

export const equipmentLedger = pgTable("equipment_ledger", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	equipment_id: varchar().notNull(),
	equipment_name: varchar().notNull(),
	equipment_model: varchar(),
	equipment_manufacturer: varchar(),
	equipment_serial_number: varchar(),
	equipment_type: varchar(),
	facility_code: varchar(),
	acquisition_date: date(),
	equipment_status: varchar().default("active"),
	equipment_notes: text(),
	created_at: timestamp().defaultNow(),
	updated_at: timestamp().defaultNow(),
	equipment_maintenance_contract: varchar(),
	equipment_storage_location: varchar(),
});
