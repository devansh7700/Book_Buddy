import cron from "node-cron";
import * as bookService from "../api/v1//services/bookServices";

export const startOverdueCron = () => {

    cron.schedule("0 0 * * *", () => {
    console.log("Running daily overdue check...");

    bookService.updateLateFees();

    console.log("Borrowed books checked and overdue fees updated.");
  });

  console.log("Cron job scheduled: Daily at midnight");
};
