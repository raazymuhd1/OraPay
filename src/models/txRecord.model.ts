import { model, Schema } from "mongoose"

const TxRecordsSchema = new Schema({
   action: { type: String, required: true },
   date: { type: Date, required: true },
   value: { type: String, required: [true, "value must included"] }
})

export const TxRecords = model("TxRecords", TxRecordsSchema);