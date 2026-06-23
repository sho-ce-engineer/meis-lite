import { seed } from "drizzle-seed";
import { equipmentLedger } from "@/db/schema";
import { db } from "@/db/index";

async function main() {
	await seed(db, { equipmentLedger }, { count: 25 });
	console.log("Generate was successful!");
	process.exit(0);
}

main();
