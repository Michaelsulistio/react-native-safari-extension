import {
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from "@expo/config-plugins";

export const withBottomSheetAndroidManifest: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    // <activity
    //     android:name=".MobileWalletAdapterBottomSheetActivity"
    //     android:launchMode="singleTask"
    //     android:theme="@style/Theme.ExampleWallet.BottomSheet"
    //     android:layout_gravity="bottom"
    //     android:exported="true">
    //     <!-- Default solana-wallet URI from a browser or native dapp -->
    //     <intent-filter android:order="1">
    //         <action android:name="android.intent.action.VIEW" />
    //         <category android:name="android.intent.category.DEFAULT" />
    //         <category android:name="android.intent.category.BROWSABLE" />
    //         <data android:scheme="solana-wallet" />
    //     </intent-filter>
    //     <!-- Any other uncategorized solana-wallet URI not covered by above -->
    //     <intent-filter android:order="0">
    //         <category android:name="android.intent.category.DEFAULT" />
    //         <data android:scheme="solana-wallet" />
    //     </intent-filter>
    // </activity>

    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    // Ensure the application's activity array is initialized
    if (!Array.isArray(mainApplication.activity)) {
      mainApplication.activity = [];
    }

    // Check if the activity already exists to avoid duplicates
    if (
      !mainApplication.activity.find(
        (item) =>
          item.$["android:name"] === ".MobileWalletAdapterBottomSheetActivity"
      )
    ) {
      mainApplication.activity.push({
        $: {
          "android:name": ".MobileWalletAdapterBottomSheetActivity",
          "android:launchMode": "singleTask",
          "android:theme": "@style/Theme.ExampleWallet.BottomSheet",
          "android:layout_gravity": "bottom",
          "android:exported": "true",
        },
        "intent-filter": [
          {
            // $: { "android:order": "1" },
            action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
            category: [
              { $: { "android:name": "android.intent.category.DEFAULT" } },
              { $: { "android:name": "android.intent.category.BROWSABLE" } },
            ],
            data: [{ $: { "android:scheme": "solana-wallet" } }],
          },
          {
            // $: { "android:order": "0" },
            category: [
              { $: { "android:name": "android.intent.category.DEFAULT" } },
            ],
            data: [{ $: { "android:scheme": "solana-wallet" } }],
          },
        ],
      });
    }

    return config;
  });
};
