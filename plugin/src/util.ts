import fs from "fs";
import path from "path";

export const PATH_TO_INJECTED_FILES =
  "node_modules/mwa-bottom-sheet-expo-plugin/inject/";

export const BOTTOM_SHEET_ACTIVITY_FILE_NAME =
  "MobileWalletAdapterBottomSheetActivity.kt";

export const BOTTOM_SHEET_STYLES_FILE_NAME = "bottom_sheet_styles.xml";

export const BOTTOM_SHEET_DRAWABLE_FILE_NAME =
  "background_bottom_sheet_dialog.xml";

export const PACKAGE_HEADER_PLACEHOLDER_STRING = "<PACKAGE_HEADER_PLACEHOLDER>";

export function copyFile(sourcePath: string, destinationPath: string) {
  const directory = path.dirname(destinationPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.copyFileSync(sourcePath, destinationPath);
}
