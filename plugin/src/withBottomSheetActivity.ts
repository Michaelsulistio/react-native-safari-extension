import {
  ConfigPlugin,
  withDangerousMod,
  AndroidConfig,
} from "@expo/config-plugins";
import fs from "fs";
import path from "path";

export const withBottomSheetActivity: ConfigPlugin = (config) => {
  console.log("Running withBottomSheetActivity");
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
        "MobileWalletAdapterBottomSheetActivity.kt"
      );

      console.log(
        "Attempting to copy activity source at: " + activitySourcePath
      );

      const activityDestinationPath = `android/app/src/main/java/${packageName.replace(
        /\./g,
        "/"
      )}/MobileWalletAdapterBottomSheetActivity.kt`;

      // Ensure the directory exists for the destination
      const activityDirectory = path.dirname(activityDestinationPath);
      if (!fs.existsSync(activityDirectory)) {
        fs.mkdirSync(activityDirectory, { recursive: true });
      }

      // Copy the file
      if (fs.existsSync(activitySourcePath)) {
        fs.copyFileSync(activitySourcePath, activityDestinationPath);
      } else {
        console.error(
          `Could not find MobileWalletAdapterBottomSheetActivity.kt at ${activitySourcePath}`
        );
        // Consider whether to throw an error or not
      }

      return config;
    },
  ]);
};
