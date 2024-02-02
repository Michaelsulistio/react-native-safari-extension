// import {
//   withAndroidManifest,
//   AndroidConfig,
//   ConfigPlugin,
//   withDangerousMod,
// } from "@expo/config-plugins";
// import fs from "fs";
// import path from "path";

// const withAndroidActivity: ConfigPlugin = (config) => {
//   console.log("Running withAndroidActivity");
//   config = withAndroidManifest(config, async (config) => {
//     // <activity
//     //     android:name=".MobileWalletAdapterBottomSheetActivity"
//     //     android:launchMode="singleTask"
//     //     android:theme="@style/Theme.ExampleWallet.BottomSheet"
//     //     android:layout_gravity="bottom"
//     //     android:exported="true">
//     //     <!-- Default solana-wallet URI from a browser or native dapp -->
//     //     <intent-filter android:order="1">
//     //         <action android:name="android.intent.action.VIEW" />
//     //         <category android:name="android.intent.category.DEFAULT" />
//     //         <category android:name="android.intent.category.BROWSABLE" />
//     //         <data android:scheme="solana-wallet" />
//     //     </intent-filter>
//     //     <!-- Any other uncategorized solana-wallet URI not covered by above -->
//     //     <intent-filter android:order="0">
//     //         <category android:name="android.intent.category.DEFAULT" />
//     //         <data android:scheme="solana-wallet" />
//     //     </intent-filter>
//     // </activity>

//     const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
//       config.modResults
//     );

//     // Ensure the application's activity array is initialized
//     if (!Array.isArray(mainApplication.activity)) {
//       mainApplication.activity = [];
//     }

//     // Check if the activity already exists to avoid duplicates
//     if (
//       !mainApplication.activity.find(
//         (item) =>
//           item.$["android:name"] === ".MobileWalletAdapterBottomSheetActivity"
//       )
//     ) {
//       mainApplication.activity.push({
//         $: {
//           "android:name": ".MobileWalletAdapterBottomSheetActivity",
//           "android:launchMode": "singleTask",
//           "android:theme": "@style/Theme.ExampleWallet.BottomSheet",
//           "android:layout_gravity": "bottom",
//           "android:exported": "true",
//         },
//         "intent-filter": [
//           {
//             // $: { "android:order": "1" },
//             action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
//             category: [
//               { $: { "android:name": "android.intent.category.DEFAULT" } },
//               { $: { "android:name": "android.intent.category.BROWSABLE" } },
//             ],
//             data: [{ $: { "android:scheme": "solana-wallet" } }],
//           },
//           {
//             // $: { "android:order": "0" },
//             category: [
//               { $: { "android:name": "android.intent.category.DEFAULT" } },
//             ],
//             data: [{ $: { "android:scheme": "solana-wallet" } }],
//           },
//         ],
//       });
//     }

//     return config;
//   });

//   return withActivitySourceCode(config);
// };

// const withActivitySourceCode: ConfigPlugin = (config) => {
//   console.log("Running withActivitySourceCode");
//   return withDangerousMod(config, [
//     "android",
//     (config) => {
//       const projectRoot = config.modRequest.projectRoot;
//       const packageName = AndroidConfig.Package.getPackage(config);
//       if (!packageName) {
//         throw Error("Unable to find Android package name");
//       }

//       const activitySourcePath = path.join(
//         projectRoot,
//         "MobileWalletAdapterBottomSheetActivity.kt"
//       );

//       console.log(
//         "Attempting to copy activity source at: " + activitySourcePath
//       );

//       const activityDestinationPath = `android/app/src/main/java/${packageName.replace(
//         /\./g,
//         "/"
//       )}/MobileWalletAdapterBottomSheetActivity.kt`;

//       // Ensure the directory exists for the destination
//       const activityDirectory = path.dirname(activityDestinationPath);
//       if (!fs.existsSync(activityDirectory)) {
//         fs.mkdirSync(activityDirectory, { recursive: true });
//       }

//       // Copy the file
//       if (fs.existsSync(activitySourcePath)) {
//         fs.copyFileSync(activitySourcePath, activityDestinationPath);
//       } else {
//         console.error(
//           `Could not find MobileWalletAdapterBottomSheetActivity.kt at ${activitySourcePath}`
//         );
//         // Consider whether to throw an error or not
//       }

//       return config;
//     },
//   ]);
// };

// export default withAndroidActivity;
