import cron from "node-cron";
import * as bookService from "../api/v1/services/bookServices";

export const startOverdueCron = () => {
 
  cron.schedule("* * * * *", async () => {
    console.log("Running overdue check...");

    try {
      await bookService.updateLateFees();
      console.log("Borrowed books checked and overdue fees updated.");
    } catch (error: any) {
      console.error("Error updating late fees:", error.message);
    }
  });

  console.log("Cron job scheduled");
};
