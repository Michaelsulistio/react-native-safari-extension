import {
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
  withDangerousMod,
} from "@expo/config-plugins";
import fs from "fs";
import path from "path";

const withAndroidActivity: ConfigPlugin = (config) => {
  console.log("Running withAndroidActivity");
  config = withAndroidManifest(config, async (config) => {
    // AndroidManifest modification logic here
    return config;
  });

  return withActivitySourceCode(config);
};

const withActivitySourceCode: ConfigPlugin = (config) => {
  console.log("Running withActivitySourceCode");
  return withDangerousMod(config, [
    "android",
    (config) => {
      const packageName = AndroidConfig.Package.getPackage(config);

      if (!packageName) {
        throw Error("Android project package name not found.");
      }

      const activityPath = `android/app/src/main/java/${packageName.replace(
        /\./g,
        "/"
      )}/MyNewActivity.java`;
      const activityJavaCode = `package ${packageName};
            
            import android.os.Bundle;
            import androidx.appcompat.app.AppCompatActivity;
            
            public class MyNewActivity extends AppCompatActivity {
                @Override
                protected void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    // setContentView(R.layout.activity_my_new);
                }
            }`;

      // Ensure the directory exists
      const activityDirectory = path.dirname(activityPath);
      if (!fs.existsSync(activityDirectory)) {
        console.log("activity directory didn't exist");
        fs.mkdirSync(activityDirectory, { recursive: true });
      }

      // Write the activity source code to the file
      console.log("Writing activity source code to path: " + activityPath);
      fs.writeFileSync(activityPath, activityJavaCode);

      return config;
    },
  ]);
};

export default withAndroidActivity;
