import Link from "next/link";
export default async function Page() {
	//equipments→後日、型設定予定
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error("DB設定が未完了です。環境変数設定を確認してください。");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments`);
	const equipments = await res.json();
	const header = ["ID", "院内ID", "機器名", "機器種別", "メーカー", "稼働状況"];
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto p-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-xl font-semibold text-gray-800">医療機器台帳</h1>
					<Link
						href="/new"
						className="bg-teal-600 text-white text-sm px-4 py-2 rounded hover:bg-teal-700 transition-colors"
					>
						＋ 新規登録
					</Link>
				</div>
				<div className="bg-white rounded-lg shadow-sm border border-gray-200">
					<table className="w-full text-sm text-left text-gray-700">
						<thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
							<tr>
								{header.map((item, index) => (
									<th
										key={index}
										scope="col"
										className="px-6 py-3 font-medium tracking-wider"
									>
										{item}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{equipments.map((equipment) => (
								<tr
									key={equipment.id}
									className="border-b border-gray-100 hover:bg-teal-50 hover:cursor-pointer transition-colors"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900"
									>
										{equipment.id}
									</th>
									<td className="px-6 py-4">{equipment.equipment_id}</td>
									<td className="px-6 py-4">{equipment.equipment_name}</td>
									<td className="px-6 py-4">{equipment.equipment_type}</td>
									<td className="px-6 py-4">
										{equipment.equipment_manufacturer}
									</td>
									<td className="px-6 py-4">{equipment.equipment_status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
