import { Hono } from "hono";
import { db } from "@/db";
import { equipmentLedger } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createEquipmentSchema } from "@/schemas/equipments";

const app = new Hono();

//登録機器の全件取得
app.get("/equipments", async (c) => {
	const Items = await db.select().from(equipmentLedger);
	return c.json(Items);
});

//登録機器の1件取得
app.get("/equipments/:id", async (c) => {
	const uniqueId = Number(c.req.param("id"));
	const targetItem = await db
		.select()
		.from(equipmentLedger)
		.where(eq(equipmentLedger.id, uniqueId));
	return c.json(targetItem);
});

//機器の登録
app.post("/equipments", async (c) => {
	const body = await c.req.json();
	const parceResult = createEquipmentSchema.safeParse(body);
	if (!parceResult.success) {
		console.error(`${parceResult.error}`);
		return c.text("[POST /equipments]Bad Request", 400);
	} else {
		const result = await db
			.insert(equipmentLedger)
			.values(parceResult.data)
			.returning();
		return c.json(result);
	}
});

export default app;
