//Define how the data will look in the database

import mongoose from "mongoose";

interface FinancialRecord {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true }
})

const FinancialRecordModel = mongoose.model<FinancialRecord>(
    "FinancialRecord",
    financialRecordSchema
  );
  
export default FinancialRecordModel;