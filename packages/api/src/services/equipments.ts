import { db } from "@/db";
import { equipmentLedger } from "@/db/schema";

export async function getAllEquipments() {
	return await db.select().from(equipmentLedger);
}
