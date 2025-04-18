import mongoose from 'mongoose';
export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connected.');
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}