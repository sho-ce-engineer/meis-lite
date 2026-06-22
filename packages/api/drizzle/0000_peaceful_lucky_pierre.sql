CREATE TABLE "equipment_ledger" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "equipment_ledger_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"equipment_id" varchar NOT NULL,
	"equipment_name" varchar NOT NULL,
	"equipment_model" varchar,
	"equipment_manufacturer" varchar,
	"equipment_serial_number" varchar,
	"equipment_type" varchar,
	"facility_code" varchar,
	"acquisition_date" date,
	"equipment_status" varchar DEFAULT 'active',
	"equipment_notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"equipment_maintenance_contract" varchar,
	"equipment_storage_location" varchar
);
