"use server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "formik-sheets-key.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});
const googleSheets = google.sheets({
  version: "v4",
  auth,
});
const drive = google.drive({
  version: "v3",
  auth,
});

export const create_sheet = async (form_title: string) => {
  console.log("Entered the create sheet function in the server actions.");
  const resource = {
    properties: {
      title: form_title,
    },
  };

  try {
    const sheet = await googleSheets.spreadsheets.create({
      requestBody: resource,
      fields: "spreadsheetId",
    });
    drive.permissions.create({
      fileId: sheet.data.spreadsheetId as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    return sheet.data.spreadsheetUrl;
  } catch (err) {
    console.log("Google Sheet Creation failed: ", err);
    throw new Error("Google Sheet Creation failed: ");
  }
};
