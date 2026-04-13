/**
 * Simulation of Google Services Integration
 * This service provides an abstraction layer for Google Calendar and Drive.
 * Real API logic can be plugged in here later.
 */

export const googleService = {
  /**
   * Simulates adding roadmap events to Google Calendar
   * @param {Array} roadmap 
   */
  async addToCalendar(roadmap) {
    return new Promise((resolve) => {
      console.log("Simulating Google Calendar event creation...", roadmap);
      setTimeout(() => {
        resolve({ success: true, message: `${roadmap.length} milestones synced to Google Calendar.` });
      }, 1500);
    });
  },

  /**
   * Simulates saving a career plan to Google Drive
   * @param {Object} plan 
   */
  async saveToDrive(plan) {
    return new Promise((resolve) => {
      console.log("Simulating Google Drive upload...", plan);
      setTimeout(() => {
        resolve({ success: true, message: "Career Roadmap saved to My Drive (AI_Career_Plan.pdf)." });
      }, 1200);
    });
  }
};
