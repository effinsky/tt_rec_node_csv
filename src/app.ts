import { config } from "dotenv"
import Express from "express"
import { candidate_controller } from "./controllers"

if (process.env.NODE_ENV !== "production") {
	config()
}
export const api_key = process.env.SUPER_SECRET_KEY

const app = Express()
app.set("view engine", "pug")
app.set("views", "src/views")
app.use(candidate_controller)

const PORT = process.env.PORT
app.listen(PORT, () => void console.log(`app listening on port ${PORT}`))
