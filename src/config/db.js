import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.SETTING_DATABASE)

const db = mongoose.connection

export default db
