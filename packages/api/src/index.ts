import { Hono } from "hono";
import { cors } from "hono/cors";
import equipments from "@/routes/equipments";

const app = new Hono();

// TODO: 本番環境では origin を環境変数で制限すること
app.use(cors());

app.route("/", equipments); //登録機器の全件取得

export default {
	port: process.env.PORT ? Number(process.env.PORT) : 3001,
	fetch: app.fetch,
};
