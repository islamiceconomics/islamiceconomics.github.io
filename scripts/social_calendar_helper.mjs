import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [, , command, filePath] = process.argv;

if (!command || !filePath) {
  console.error("Usage: node scripts/social_calendar_helper.mjs <inspect> <xlsx-path>");
  process.exit(1);
}

const input = await FileBlob.load(filePath);
const workbook = await SpreadsheetFile.importXlsx(input);

if (command === "inspect") {
  const sheetNames = workbook.worksheets.items.map((sheet) => sheet.name);
  console.log(JSON.stringify({ sheetNames }, null, 2));
  const firstSheet = workbook.worksheets.items[0];
  const preview = await workbook.inspect({
    kind: "table",
    range: `${firstSheet.name}!A1:H20`,
    include: "values,formulas",
    tableMaxRows: 20,
    tableMaxCols: 8,
  });
  console.log(preview.ndjson);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
