import nodemailer from "nodemailer";

/**
 * Sends the school one email per new application, using the school's Gmail.
 *
 * Setup:
 *  1. Turn on 2-Step Verification on kjuniorangels1@gmail.com.
 *  2. Google Account -> Security -> App passwords -> create one called "Website".
 *  3. Add to .env:
 *       GMAIL_USER=kjuniorangels1@gmail.com
 *       GMAIL_APP_PASSWORD=the-16-letter-app-password
 *       ADMISSIONS_NOTIFY_TO=kjuniorangels1@gmail.com
 *
 * Returns true if sent, false if not. Never throws; the application is already
 * saved before this runs. The caller uses the result to flag the application.
 */
export async function emailSchool(subject: string, text: string): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.ADMISSIONS_NOTIFY_TO ?? user;

  if (!user || !pass || !to) {
    console.warn("[mailer] Email not configured, skipping notification.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({ from: `"KJAC Website" <${user}>`, to, subject, text });
    return true;
  } catch (err) {
    console.error("[mailer] Failed to send admissions email:", err);
    return false;
  }
}