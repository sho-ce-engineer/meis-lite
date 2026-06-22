import { Hono } from "hono";
import { db } from "@/db";
import { equipmentLedger } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export default app;
