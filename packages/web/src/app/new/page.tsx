"use client";
import { useState } from "react";

export default function Page() {
	//equipments→後日、型設定予定
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error("DB設定が未完了です。環境変数設定を確認してください。");
	}

	// TODO: 将来的にはログインユーザーの認証情報・施設設定から取得する
	// 現在はダミー設計
	const facilityCode = "DUMMY_FACILITY";
	if (!facilityCode) {
		throw new Error("権限がありません。ログインしてください。");
	}

	const nameCentralManagementCenter = "機器管理センター";
	if (!nameCentralManagementCenter) {
		throw new Error("医療機器の中央管理場所の名称が設定されていません。");
	}

	const [message, setMessage] = useState("");

	const handleSubmit = async (formData: FormData) => {
		const data = Object.fromEntries(formData.entries());
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				console.error("登録に失敗しました", res.status);
				return;
			}

			setMessage("機器を登録しました。");
		} catch (error) {
			console.error("[POST /equipments]Internal Server Error", error);
			throw new Error("[POST /equipments]Server Error");
		}
	};

	return (
		<>
			<form action={handleSubmit}>
				<input type="hidden" name="facility_code" value={facilityCode} />
				<div>
					<label htmlFor="equipment_id">院内機器ID</label>
					<input type="text" id="equipment_id" name="equipment_id" required />
				</div>
				<div>
					<label htmlFor="equipment_name">機器名称</label>
					<input
						type="text"
						id="equipment_name"
						name="equipment_name"
						required
					/>
				</div>
				<div>
					<label htmlFor="equipment_type">機器種別</label>
					<input type="text" id="equipment_type" name="equipment_type" />
				</div>
				<div>
					<label htmlFor="equipment_model">型番</label>
					<input type="text" id="equipment_model" name="equipment_model" />
				</div>
				<div>
					<label htmlFor="equipment_manufacturer">メーカー</label>
					<input
						type="text"
						id="equipment_manufacturer"
						name="equipment_manufacturer"
					/>
				</div>
				<div>
					<label htmlFor="equipment_serial_number">S/N</label>
					<input
						type="text"
						id="equipment_serial_number"
						name="equipment_serial_number"
						required
					/>
				</div>
				<div>
					<label htmlFor="acquisition_date">購入年月日</label>
					<input
						type="date"
						id="acquisition_date"
						name="acquisition_date"
						required
					/>
				</div>
				<div>
					<label htmlFor="equipment_status">機器稼働状況</label>
					<select id="equipment_status" name="equipment_status" required>
						<option value="active">稼働</option>
						<option value="none">休止</option>
					</select>
				</div>
				<div>
					<label htmlFor="equipment_notes">補足</label>
					<input
						type="text"
						id="equipment_notes"
						name="equipment_notes"
					></input>
				</div>
				<div>
					<label htmlFor="equipment_maintenance_contract">保守加入状況</label>
					<input
						type="text"
						id="equipment_maintenance_contract"
						name="equipment_maintenance_contract"
						defaultValue="none"
						required
					/>
				</div>
				<div>
					<label htmlFor="equipment_storage_location">保守設置場所</label>
					<input
						type="text"
						id="equipment_storage_location"
						name="equipment_storage_location"
						defaultValue={nameCentralManagementCenter}
					/>
				</div>
				<button type="submit">登録する</button>
			</form>
			{message && <p>{message}</p>}
		</>
	);
}
