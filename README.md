# Apex TaskFlow - Android Project & Automated APK/AAB Pipeline

> **Real Android Project with Jetpack Compose & Automated GitHub Actions CI/CD Pipeline**

---

## 🇧🇩 বাংলা নির্দেশিকা (Bengali Guide)

এই প্রজেক্টটি একটি সম্পূর্ণ, প্রোডাকশন-রেডি **Android (Kotlin + Jetpack Compose)** অ্যাপ এবং সাথে রয়েছে স্বয়ংক্রিয় **GitHub Actions Build Pipeline**।

### কীভাবে GitHub এ পুশ করে অটোমেটিক আসল APK এবং AAB ডাউনলোড করবেন:

1. **GitHub Repository তৈরি করুন এবং কোড পুশ করুন:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Apex TaskFlow Android project & build pipeline"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **অটোমেটিক বিল্ড শুরু হবে:**
   - আপনার রিপোজিটরির **Actions** ট্যাবে যান (`GitHub → Actions`)।
   - দেখতে পাবেন **"Android Build & Release Pipeline"** ওয়ার্কফ্লোটি স্বয়ংক্রিয়ভাবে চলছে।

3. **আসল APK এবং AAB ডাউনলোড করুন:**
   - বিল্ড সম্পন্ন হলে (সবুজ টিক মার্ক আসার পর) রানটিতে ক্লিক করুন।
   - পেজের নিচে **Artifacts** সেকশনে পাবেন:
     - 📦 **Android-APK** (`app-debug.apk` - ১MB এর বেশি সাইজের আসল টেস্টেড APK)
     - 📦 **Android-AAB** (`app-release.aab` - গুগল প্লে স্টোর আপলোডের জন্য রিলিজ বান্ডেল)
   - এক ক্লিকে ডাউনলোড করে নিন!

---

## 🚀 Project Overview

- **App Name:** Apex TaskFlow
- **Package Name:** `com.apex.taskflow`
- **Architecture:** MVVM + Clean Architecture + Repository Pattern
- **UI Framework:** Android Jetpack Compose + Material Design 3
- **Min SDK:** 24 (Android 7.0+)
- **Target / Compile SDK:** 34 (Android 14)
- **Language:** Kotlin 1.9.22 + Java 17
- **Build System:** Gradle 8.4 (Android Gradle Plugin 8.2.2)

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── android-build.yml       # Automated CI/CD: Builds APK & AAB, validates & uploads artifacts
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml # Permissions, activities, application configs
│   │   │   ├── java/com/apex/taskflow/
│   │   │   │   ├── MainActivity.kt # Root Compose activity & navigation controller
│   │   │   │   ├── data/
│   │   │   │   │   ├── model/TaskItem.kt
│   │   │   │   │   └── repository/TaskRepository.kt
│   │   │   │   └── ui/
│   │   │   │       ├── screens/    # HomeScreen, CreateTaskScreen, AnalyticsScreen, SettingsScreen
│   │   │   │       └── theme/      # Material3 Color, Typography, and Theme
│   │   │   └── res/                # Drawables, mipmaps, strings, colors, adaptive icons
│   ├── build.gradle.kts            # App-level dependencies & build types
│   └── proguard-rules.pro          # Proguard rules for release optimization
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar      # Official Gradle wrapper runtime
│       └── gradle-wrapper.properties
├── gradlew                         # Linux/macOS Gradle executable
├── gradlew.bat                     # Windows Gradle executable
├── build.gradle.kts                # Top-level build configuration
├── settings.gradle.kts             # Subproject & plugin repositories
├── gradle.properties               # Memory & daemon optimizations
├── APK_DOWNLOAD/                   # Target staging directory for app-debug.apk
├── .build-outputs/                 # Target build artifacts directory
└── README.md
```

---

## ⚙️ Automated GitHub Actions Workflow

Located in `.github/workflows/android-build.yml`:

| Step | Action |
|------|--------|
| **1. Triggers** | Runs on `push` to `main` branch or manual trigger (`workflow_dispatch`) |
| **2. Environment** | Sets up Java 17 Temurin & Android SDK API 34 |
| **3. Debug APK** | Executes `./gradlew assembleDebug --stacktrace` |
| **4. Validation** | Verifies APK existence, size > 1MB, validates AndroidManifest & calculates SHA-256 |
| **5. Copying** | Stages real APK to `APK_DOWNLOAD/app-debug.apk` and `.build-outputs/app-debug.apk` |
| **6. Artifacts** | Publishes `Android-APK` and `Android-AAB` to GitHub Actions run artifacts |

---

## 🔐 Optional Release Signing (Google Play Store)

To sign production release builds:
Add the following secrets in **GitHub → Settings → Secrets and variables → Actions**:
- `KEYSTORE_BASE64`: Base64 encoded `.jks` or `.keystore` file (`base64 -w 0 release.jks`)
- `KEYSTORE_PASSWORD`: Keystore master password
- `KEY_ALIAS`: Key alias name
- `KEY_PASSWORD`: Key password

---

## 💻 Local Build Commands

If running on a machine with Android SDK & Java 17:
```bash
# Build Debug APK
./gradlew assembleDebug

# Build Release App Bundle (AAB)
./gradlew bundleRelease

# Clean build
./gradlew clean
```
Output files:
- APK: `app/build/outputs/apk/debug/app-debug.apk`
- AAB: `app/build/outputs/bundle/release/app-release.aab`
