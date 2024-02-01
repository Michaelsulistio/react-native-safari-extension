import {
  ConfigPlugin,
  withAndroidManifest,
  withPlugins,
} from "@expo/config-plugins";

import withAndroidActivity from "./withAndroidActivity";

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
  //  2. Write into AndroidManifest and add this new activity with `solana-wallet` intent filter
  //      - Optionally include additional intent filters if provided
  return withAndroidActivity(config);
};

export default withBottomSheet;
