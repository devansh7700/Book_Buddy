import cron from "node-cron";

export const startOverdueCron = () => {
  // Runs everyday at midnight
  cron.schedule("0 0 * * *", () => {
    console.log("🔄 Running daily overdue check...");

    // TODO: Replace this with real DB logic later
    console.log("Checking borrowed books and marking overdue ones...");
  });

  console.log("⏱️ Cron job scheduled: Daily at midnight");
};
