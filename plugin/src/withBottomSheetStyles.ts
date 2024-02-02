import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs";
import path from "path";

export const withBottomSheetStyles: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // Paths for the theme and drawable files in your project
      const themeFilePath = path.join(projectRoot, "bottom_sheet_styles.xml"); // Adjust this path
      const drawableFilePath = path.join(
        projectRoot,
        "background_bottom_sheet_dialog.xml"
      ); // Adjust this path

      // Destination paths in the Android project
      const androidThemePath = path.join(
        projectRoot,
        "android/app/src/main/res/values/bottom_sheet_styles.xml"
      );
      const androidDrawablePath = path.join(
        projectRoot,
        "android/app/src/main/res/drawable/background_bottom_sheet_dialog.xml"
      );

      // Copy the files
      copyFile(themeFilePath, androidThemePath);
      copyFile(drawableFilePath, androidDrawablePath);

      return config;
    },
  ]);
};

function copyFile(sourcePath: string, destinationPath: string) {
  const directory = path.dirname(destinationPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.copyFileSync(sourcePath, destinationPath);
}
