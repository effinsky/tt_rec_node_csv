import { Request, Response } from "express"
import {
	candidates_csv_handler,
	root_handler,
} from "../../controllers/candidate_controller"
import { create_csv_file } from "../../utils/file_ops"

describe("candidates controller", () => {
	describe("root handler", () => {
		test("should call render on http service", () => {
			const res = { render: () => {} }
			root_handler({} as Request, res as unknown as Response)

			expect(res.render).toHaveBeenCalled()
		})
	})

	describe("candidates csv handler", () => {
		test("should initiate file creation", () => {
			candidates_csv_handler({} as Request, {} as Response)

			expect(create_csv_file).toHaveBeenCalled()
		})
	})
})
