export default async function Page() {
	//equipments→後日、型設定予定
	if (!process.env.NEXT_PUBLIC_API_URL) {
		throw new Error("DB設定が未完了です。環境変数設定を確認してください。");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/equipments`);
	const equipments = await res.json();
	const header = ["ID", "院内ID", "機器名", "機器種別", "メーカー", "稼働状況"];
	return (
		<table>
			<thead>
				<tr>
					{header.map((item, index) => (
						<th scope="col" key={index}>
							{item}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{equipments.map((equipment) => (
					<tr key={equipment.id}>
						<th scope="row">{equipment.id}</th>
						<td>{equipment.equipment_id}</td>
						<td>{equipment.equipment_name}</td>
						<td>{equipment.equipment_type}</td>
						<td>{equipment.equipment_manufacturer}</td>
						<td>{equipment.equipment_status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
