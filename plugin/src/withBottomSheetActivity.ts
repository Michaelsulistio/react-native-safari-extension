import {
  ConfigPlugin,
  withDangerousMod,
  AndroidConfig,
} from "@expo/config-plugins";
import fs from "fs";
import path from "path";

import {
  copyFile,
  BOTTOM_SHEET_ACTIVITY_FILE_NAME,
  PATH_TO_INJECTED_FILES,
  PACKAGE_HEADER_PLACEHOLDER_STRING,
} from "./util";

export const withBottomSheetActivity: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const packageName = AndroidConfig.Package.getPackage(config);
      if (!packageName) {
        throw Error("Unable to find Android package name");
      }

      const activitySourcePath = path.join(
        projectRoot,
        PATH_TO_INJECTED_FILES,
        BOTTOM_SHEET_ACTIVITY_FILE_NAME
      );

      const activityDestinationPath = `android/app/src/main/java/${packageName.replace(
        /\./g,
        "/"
      )}/${BOTTOM_SHEET_ACTIVITY_FILE_NAME}`;

      copyFile(activitySourcePath, activityDestinationPath);

      // Read the newly written activity file content
      const activityContent = fs.readFileSync(activityDestinationPath, {
        encoding: "utf8",
      });

      // Replace the placeholder with the actual package name
      const updatedActivityContent = activityContent.replace(
        PACKAGE_HEADER_PLACEHOLDER_STRING,
        packageName
      );

      // Write the updated content back to the file
      fs.writeFileSync(activityDestinationPath, updatedActivityContent, {
        encoding: "utf8",
      });

      return config;
    },
  ]);
};
