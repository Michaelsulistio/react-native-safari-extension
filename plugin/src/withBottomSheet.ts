import { ConfigPlugin, withPlugins } from "@expo/config-plugins";

import { withBottomSheetActivity } from "./withBottomSheetActivity";
import { withBottomSheetAndroidManifest } from "./withBottomSheetAndroidManifest";
import { withBottomSheetStyles } from "./withBottomSheetStyles";

type PluginParams = {
  folderName: string;
  dependencies?: Record<string, string>[];
};

const withBottomSheet: ConfigPlugin<PluginParams> = (
  config,
  { folderName, dependencies }
) => {
  console.log("Running withBottomSheet");
  // Steps:
  //  1. Write AndroidActivity into Android project
  //  2. Add styles/drawables into Android project
  //  3. Write into AndroidManifest and add this new activity with `solana-wallet` intent filter
  //      - Optionally include additional intent filters if provided
  return withPlugins(config, [
    withBottomSheetActivity,
    withBottomSheetStyles,
    withBottomSheetAndroidManifest,
  ]);
};

export default withBottomSheet;
