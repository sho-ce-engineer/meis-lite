import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "@/db";
import { equipmentLedger } from "@/db/schema";
import { createEquipmentSchema } from "@/schemas/equipments";

const app = new Hono();

//登録機器の全件取得
app.get("/equipments", async (c) => {
	try {
		const Items = await db.select().from(equipmentLedger);
		return c.json(Items);
	} catch (error) {
		console.error("[GET /equipments]Internal Server Error", error);
		return c.text("[GET /equipments]Internal Server Error", 500);
	}
});

//登録機器の1件取得
app.get("/equipments/:id", async (c) => {
	const uniqueId = Number(c.req.param("id"));

	if (!uniqueId) {
		console.error("[GET /equipments/id]Bad Request");
		return c.text("[GET /equipments/id]Bad Request", 400);
	}

	try {
		const targetItem = await db
			.select()
			.from(equipmentLedger)
			.where(eq(equipmentLedger.id, uniqueId));
		if (targetItem.length === 0) {
			console.error("[GET /equipments/id]Not Found ID");
			return c.text("[GET /equipments/id]Not Found", 404);
		}
		return c.json(targetItem);
	} catch (error) {
		console.error("[GET /equipments/id]Internal Server Error", error);
		return c.text("[GET /equipments/id]Internal Server Error", 500);
	}
});

//機器の登録
app.post("/equipments", async (c) => {
	const body = await c.req.json();
	const parceResult = createEquipmentSchema.safeParse(body);

	if (!parceResult.success) {
		console.error(`${parceResult.error}`);
		return c.text("[POST /equipments]Bad Request", 400);
	}

	try {
		const result = await db
			.insert(equipmentLedger)
			.values(parceResult.data)
			.returning();
		return c.json(result, 201);
	} catch (error) {
		console.error("[POST /equipments]Internal Server Error", error);
		return c.text("[POST /equipments]Internal Server Error", 500);
	}
});

//登録機器の1件削除
app.delete("/equipments/:id", async (c) => {
	const uniqueId = Number(c.req.param("id"));
	if (!uniqueId) {
		console.error("[DELETE /equipments/id]Bad Request");
		return c.text("[DELETE /equipments/id]Bad Request", 400);
	}
	try {
		const result = await db
			.delete(equipmentLedger)
			.where(eq(equipmentLedger.id, uniqueId))
			.returning();

		if (result.length === 0) {
			return c.text("[DELETE /equipments/id]Not Found", 404);
		}

		return c.body(null, 204);
	} catch (error) {
		console.error("[DELETE /equipments/id]Internal Server Error", error);
		return c.text("[DELETE /equipments/id]Internal Server Error", 500);
	}
});

//機器の登録内容の編集
app.patch("/equipments/:id", async (c) => {
	const uniqueId = Number(c.req.param("id"));
	const body = await c.req.json();
	const patchEquipmentSchema = createEquipmentSchema.partial();
	const parceResult = patchEquipmentSchema.safeParse(body);

	if (!parceResult.success) {
		console.error(`${parceResult.error}`);
		return c.text("[PATCH /equipments/id]Bad Request", 400);
	}

	try {
		const result = await db
			.update(equipmentLedger)
			.set(parceResult.data)
			.where(eq(equipmentLedger.id, uniqueId))
			.returning();

		if (result.length === 0) {
			console.error("[PATCH /equipments/id]Not Found ID");
			return c.text("[PATCH /equipments/id]Not Found", 404);
		}
		return c.json(result);
	} catch (error) {
		console.error("[PATCH /equipments/id]Internal Server Error", error);
		return c.text("[PATCH /equipments/id]Internal Server Error", 500);
	}
});

export default app;
