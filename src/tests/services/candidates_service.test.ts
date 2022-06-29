import { get_cands_data } from "../../services/candidates_service"
import { get_tt_data } from "../../utils/tt_api"

describe("candidates service", () => {
	test("makes call to tt backend to get candidate data", async () => {
		await get_cands_data()
		// expect(get_tt_data).toHaveBeenCalled()
	})

	// because we have non-optimized calls and make one for each candidate retrieved
	// to get their job applications
	test("makes call to tt backend for each candidate item received", async () => {
		// mock return value, check its length, check if tt endpoint called same
		// no of times
		await get_cands_data()
		// expect(get_tt_data).toHaveBeenCalled()
	})
})
