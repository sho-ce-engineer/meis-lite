ALTER TABLE "equipment_ledger" ALTER COLUMN "equipment_serial_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "facility_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "equipment_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "equipment_maintenance_contract" SET DEFAULT 'none';--> statement-breakpoint
ALTER TABLE "equipment_ledger" ALTER COLUMN "equipment_maintenance_contract" SET NOT NULL;