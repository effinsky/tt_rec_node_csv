import ObjectsToCsv from "objects-to-csv"

export type FileCreationResult =
	| { type: "success"; payload: ObjectsToCsv }
	| { type: "failure" }

export const create_csv_file = async (
	data: object[],
	path: string
): Promise<FileCreationResult> => {
	try {
		const csv = new ObjectsToCsv(data)
		await csv.toDisk(path)
		return { type: "success", payload: csv }
	} catch (err) {
		console.error(err)
		return { type: "failure" }
	}
}
