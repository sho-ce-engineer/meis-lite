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
	equipment_type: varchar(),
	equipment_model: varchar(),
	equipment_manufacturer: varchar(),
	equipment_serial_number: varchar().notNull(),
	facility_code: varchar().notNull(),
	acquisition_date: date(),
	equipment_status: varchar().default("active").notNull(),
	equipment_notes: text(),
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().notNull().defaultNow(),
	equipment_maintenance_contract: varchar().default("none").notNull(),
	equipment_storage_location: varchar(),
});
