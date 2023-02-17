const mongoose = require("mongoose");

export const connectToTheDatabase = async (): Promise<void> => {
  await mongoose
    .connect(process.env.DATABASE_CONNECT_URL)
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error: any) => {
      console.log("Database connection error: " + error);
    });
};
