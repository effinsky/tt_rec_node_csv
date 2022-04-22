import { config } from "dotenv"
import Express from "express"
import { router } from "./routes"

if (process.env.NODE_ENV !== "production") {
    config()
}
export const api_key = process.env.SUPER_SECRET_KEY

const app = Express()
// make sure this checks out
app.set("view engine", "pug")
app.set("views", "src/views")
app.use(router)

const PORT = process.env.PORT
app.listen(PORT, () => void console.log(`app listening on port ${PORT}`))
