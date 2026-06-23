import { seed } from "drizzle-seed";
import { equipmentLedger } from "@/db/schema";
import { db } from "@/db/index";
import { sql } from "drizzle-orm";

async function main() {
	await seed(db, { equipmentLedger }, { count: 25 });
	//seed後にIDシーケンスをMAX(id)に同期
	await db.execute(
		sql`SELECT setval('equipment_ledger_id_seq', (SELECT MAX(id) FROM equipment_ledger))`,
	);
	console.log("Generate was successful!");
	process.exit(0);
}

main();
