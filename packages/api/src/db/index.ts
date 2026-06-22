import { drizzle } from "drizzle-orm/postgres-js";

if (!process.env.DATABASE_URL) {
	throw new Error("DB設定が未完了です。環境変数設定を確認してください。");
}

export const db = drizzle({
	connection: {
		url: process.env.DATABASE_URL,
		ssl: true,
		prepare: false,
	},
});
