import { Hono } from "hono";
import { db } from "@/db";
import { equipmentLedger } from "@/db/schema";

const app = new Hono();

//登録機器の全件取得
app.get("/equipments", async (c) => {
	const Items = await db.select().from(equipmentLedger);
	return c.json(Items);
});

export default app;
