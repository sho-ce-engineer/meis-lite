import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllEquipments } from "./equipments";

const mockFrom = vi.fn();
const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

vi.mock("@/db", () => ({
	db: {
		select: mockSelect,
	},
}));

describe("getAllEquipments", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("機器一覧を返す", async () => {
		mockFrom.mockResolvedValue([
			{
				id: 1,
				equipment_id: "testME12",
				equipment_name: "テスト医療機器",
				equipment_type: "Endoscopy",
				equipment_model: "TESTENDO",
				equipment_manufacturer: "テストメーカ",
				equipment_serial_number: "115115",
				facility_code: "testHospital",
				acquisition_date: "2026-06-01",
				equipment_status: "active",
				equipment_notes: "これはテストデータの補足です",
				created_at: "",
				updated_at: "",
				equipment_maintenance_contract: "none",
				equipment_storage_location: "テスト病棟",
			},
		]);

		const result = await getAllEquipments();
		expect(result).toEqual([
			{
				id: 1,
				equipment_id: "testME12",
				equipment_name: "テスト医療機器",
				equipment_type: "Endoscopy",
				equipment_model: "TESTENDO",
				equipment_manufacturer: "テストメーカ",
				equipment_serial_number: "115115",
				facility_code: "testHospital",
				acquisition_date: "2026-06-01",
				equipment_status: "active",
				equipment_notes: "これはテストデータの補足です",
				created_at: "",
				updated_at: "",
				equipment_maintenance_contract: "none",
				equipment_storage_location: "テスト病棟",
			},
		]);
	});

	it("DBエラー時にエラーをthrowする", async () => {
		mockFrom.mockRejectedValue(new Error("DB error"));

		await expect(getAllEquipments()).rejects.toThrow("DB error");
	});
});
