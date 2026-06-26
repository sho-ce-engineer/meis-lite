"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error("DB設定が未完了です。環境変数設定を確認してください。");
	}

	// TODO: 将来的にはログインユーザーの認証情報・施設設定から取得する
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
				headers: { "Content-Type": "application/json" },
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

	const inputClass =
		"w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500";
	const labelClass = "block text-sm font-medium text-gray-600 mb-1";
	const fieldClass = "mb-4";

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-2xl mx-auto p-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-xl font-semibold text-gray-800">機器新規登録</h1>
					<Link href="/" className="text-sm text-teal-600 hover:underline">
						← 一覧に戻る
					</Link>
				</div>
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<form action={handleSubmit}>
						<input type="hidden" name="facility_code" value={facilityCode} />
						<div className={fieldClass}>
							<label htmlFor="equipment_id" className={labelClass}>
								院内機器ID <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="equipment_id"
								name="equipment_id"
								required
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_name" className={labelClass}>
								機器名称 <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="equipment_name"
								name="equipment_name"
								required
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_type" className={labelClass}>
								機器種別
							</label>
							<input
								type="text"
								id="equipment_type"
								name="equipment_type"
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_model" className={labelClass}>
								型番
							</label>
							<input
								type="text"
								id="equipment_model"
								name="equipment_model"
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_manufacturer" className={labelClass}>
								メーカー
							</label>
							<input
								type="text"
								id="equipment_manufacturer"
								name="equipment_manufacturer"
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_serial_number" className={labelClass}>
								S/N <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="equipment_serial_number"
								name="equipment_serial_number"
								required
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="acquisition_date" className={labelClass}>
								購入年月日 <span className="text-red-500">*</span>
							</label>
							<input
								type="date"
								id="acquisition_date"
								name="acquisition_date"
								required
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_status" className={labelClass}>
								機器稼働状況 <span className="text-red-500">*</span>
							</label>
							<select
								id="equipment_status"
								name="equipment_status"
								required
								className={inputClass}
							>
								<option value="active">稼働</option>
								<option value="none">休止</option>
							</select>
						</div>
						<div className={fieldClass}>
							<label htmlFor="equipment_notes" className={labelClass}>
								補足
							</label>
							<input
								type="text"
								id="equipment_notes"
								name="equipment_notes"
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label
								htmlFor="equipment_maintenance_contract"
								className={labelClass}
							>
								保守加入状況 <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="equipment_maintenance_contract"
								name="equipment_maintenance_contract"
								defaultValue="none"
								required
								className={inputClass}
							/>
						</div>
						<div className={fieldClass}>
							<label
								htmlFor="equipment_storage_location"
								className={labelClass}
							>
								保守設置場所
							</label>
							<input
								type="text"
								id="equipment_storage_location"
								name="equipment_storage_location"
								defaultValue={nameCentralManagementCenter}
								className={inputClass}
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-teal-700 transition-colors mt-2"
						>
							登録する
						</button>
					</form>
				</div>
				{message && (
					<div className="fixed bottom-4 right-4 bg-teal-600 text-white text-sm px-4 py-3 rounded shadow-lg">
						{message}
					</div>
				)}
			</div>
		</div>
	);
}
