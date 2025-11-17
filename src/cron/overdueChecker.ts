import cron from "node-cron";

export const startOverdueCron = () => {

    cron.schedule("0 0 * * *", () => {
    console.log("Running daily overdue check...");

    console.log("Checking borrowed books and marking overdue ones...");
  });

  console.log("Cron job scheduled: Daily at midnight");
};
