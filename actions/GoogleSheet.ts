"use server";
import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { FieldType } from "@prisma/client";
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

export const create_sheet = async (
  form_title: string,
  form_id: string,
  form_fields: FormElement[],
) => {
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

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: sheet.data.spreadsheetId as string,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            "User Email ID",
            ...form_fields
              .filter(
                (ele) =>
                  ele.type === FieldType.OPTION ||
                  ele.type === FieldType.TEXT_INPUT,
              )
              .map((ele) => {
                switch (ele.type) {
                  case FieldType.TEXT_INPUT:
                  case FieldType.OPTION:
                    return `${ele.title.slice(0, 10)} [${ele.type} ${ele.index}]`;
                }
              }),
          ],
        ],
      },
    });

    await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: sheet.data.spreadsheetId as string,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheet.data.sheets?.[0].properties?.sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 100,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields: "userEnteredFormat.textFormat.bold",
            },
          },
          {
            updateDimensionProperties: {
              range: {
                sheetId: sheet.data.sheets?.[0].properties?.sheetId,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 100,
              },
              properties: {
                pixelSize: 200,
              },
              fields: "pixelSize",
            },
          },
        ],
      },
    });

    drive.permissions.create({
      fileId: sheet.data.spreadsheetId as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    await prisma.googleSheet.create({
      data: {
        sheet_id: sheet.data.spreadsheetId as string,
        form_id: form_id,
      },
    });
  } catch (err) {
    console.log("Google Sheet Creation failed: ", err);
    throw new Error("Google Sheet Creation failed: ");
  }
};
