import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://foodie:11251998@cluster0.tdzou.mongodb.net/CampusEat').then(()=>console.log("DB Connected"));

}