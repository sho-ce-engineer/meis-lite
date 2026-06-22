import * as z from "zod";

export const createEquipmentSchema = z.object({
	equipment_id: z.string(),
	equipment_name: z.string(),
	equipment_type: z.string().optional(),
	equipment_model: z.string().optional(),
	equipment_manufacturer: z.string().optional(),
	equipment_serial_number: z.string(),
	facility_code: z.string(),
	acquisition_date: z.string().optional(),
	equipment_status: z.string().optional(),
	equipment_notes: z.string().optional(),
	equipment_maintenance_contract: z.string().optional(),
	equipment_storage_location: z.string().optional(),
});
