# APK Download Directory

This directory is designated for the generated Android debug APK:

```
APK_DOWNLOAD/
└── app-debug.apk
```

### Automatic Generation via GitHub Actions CI/CD
Whenever you push this repository to GitHub:
1. The automated workflow `.github/workflows/android-build.yml` triggers automatically on GitHub's Ubuntu runners.
2. It sets up JDK 17, Android SDK API 34, and executes `./gradlew assembleDebug`.
3. It validates that the APK is > 1MB, verifies the AndroidManifest, computes SHA-256 hashes, and outputs the real APK to `APK_DOWNLOAD/app-debug.apk` and `.build-outputs/app-debug.apk`.
4. It attaches the APK to the workflow run under **Artifacts → Android-APK** for 1-click download!

### Manual Local Build (With Android Studio or JDK 17)
Run the standard Gradle command:
```bash
./gradlew assembleDebug
cp app/build/outputs/apk/debug/app-debug.apk APK_DOWNLOAD/app-debug.apk
```
