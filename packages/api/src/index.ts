import { Hono } from "hono";
import equipments from "@/routes/equipments";

const app = new Hono();
app.route("/", equipments); //登録機器の全件取得

export default {
	port: process.env.PORT ? Number(process.env.PORT) : 3001,
	fetch: app.fetch,
};
