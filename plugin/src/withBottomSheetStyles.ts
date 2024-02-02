import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import path from "path";

import {
  BOTTOM_SHEET_DRAWABLE_FILE_NAME,
  BOTTOM_SHEET_STYLES_FILE_NAME,
  PATH_TO_INJECTED_FILES,
  copyFile,
} from "./util";

export const withBottomSheetStyles: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const projectRoot = config.modRequest.projectRoot;

      // Paths for the theme and drawable files in your project
      const stylesSourcePath = path.join(
        projectRoot,
        PATH_TO_INJECTED_FILES,
        BOTTOM_SHEET_STYLES_FILE_NAME
      );
      const drawableSourcePath = path.join(
        projectRoot,
        PATH_TO_INJECTED_FILES,
        BOTTOM_SHEET_DRAWABLE_FILE_NAME
      ); // Adjust this path

      // Destination paths in the Android project
      const stylesDestinationPath = path.join(
        projectRoot,
        "android/app/src/main/res/values/",
        BOTTOM_SHEET_STYLES_FILE_NAME
      );
      const drawableDestinationPath = path.join(
        projectRoot,
        "android/app/src/main/res/drawable/",
        BOTTOM_SHEET_DRAWABLE_FILE_NAME
      );

      // Copy the files
      copyFile(stylesSourcePath, stylesDestinationPath);
      copyFile(drawableSourcePath, drawableDestinationPath);

      return config;
    },
  ]);
};
