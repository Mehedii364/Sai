import React, { useState } from 'react';
import {
  GitBranch,
  Play,
  CheckCircle2,
  Download,
  Copy,
  Check,
  Terminal,
  ShieldAlert,
  FolderArchive,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';

export const BuildPipelineViewer: React.FC = () => {
  const [gitUsername, setGitUsername] = useState('your-github-username');
  const [repoName, setRepoName] = useState('apex-taskflow-android');
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const pushCommand = `git init
git add .
git commit -m "feat: complete Android project & automated build pipeline"
git branch -M main
git remote add origin https://github.com/${gitUsername}/${repoName}.git
git push -u origin main`;

  const pipelineSteps = [
    {
      num: 1,
      title: 'Repository Push / Dispatch Trigger',
      desc: 'Runs on push to main or manual workflow_dispatch button in GitHub Actions tab',
      command: 'on: [push, workflow_dispatch]',
      icon: GitBranch,
      status: 'Ready'
    },
    {
      num: 2,
      title: 'JDK 17 & Android SDK Setup',
      desc: 'Spins up Ubuntu 22.04 LTS, installs Temurin JDK 17, and caches Gradle dependencies',
      command: 'uses: actions/setup-java@v4 & android-actions/setup-android@v3',
      icon: Cpu,
      status: 'Ready'
    },
    {
      num: 3,
      title: 'Assemble Debug APK',
      desc: 'Executes clean Gradle daemon task to compile Android sources, resources & bytecode',
      command: './gradlew assembleDebug --stacktrace',
      icon: Terminal,
      status: 'Ready'
    },
    {
      num: 4,
      title: 'APK Verification & Integrity Check',
      desc: 'Checks file exists, size > 1MB, validates AndroidManifest.xml and computes SHA-256',
      command: 'unzip -t app-debug.apk && sha256sum',
      icon: FileCheck,
      status: 'Ready'
    },
    {
      num: 5,
      title: 'Stage & Upload Debug APK Artifact',
      desc: 'Copies APK to APK_DOWNLOAD/app-debug.apk and publishes "Android-APK" artifact',
      command: 'uses: actions/upload-artifact@v4 (name: Android-APK)',
      icon: Download,
      status: 'Ready'
    },
    {
      num: 6,
      title: 'Bundle Release AAB (Google Play)',
      desc: 'Executes bundleRelease task and publishes "Android-AAB" artifact for Play Console',
      command: './gradlew bundleRelease --stacktrace',
      icon: Layers,
      status: 'Ready'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-700/50 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CI/CD Pipeline Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Automated APK &amp; AAB Pipeline
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Every push to GitHub executes <code className="text-indigo-300 bg-slate-950/80 px-1.5 py-0.5 rounded font-mono">.github/workflows/android-build.yml</code>, compiling your Kotlin Jetpack Compose code with real Gradle 8.4, verifying binary size (&gt;1MB), and uploading downloadable artifacts.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shrink-0 text-center sm:text-right">
            <span className="text-xs text-slate-400 block">Target Android Release</span>
            <span className="text-lg font-bold text-white block mt-0.5">Android 14 (API 34)</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center justify-center sm:justify-end gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Real Gradle Build
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Flow */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Pipeline Execution Stages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineSteps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                      {step.num}
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                      {step.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="font-mono text-[11px] text-indigo-300 bg-slate-950 p-2 rounded-lg truncate border border-slate-900">
                    {step.command}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GitHub Repository Push Helper */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            Connect with GitHub &amp; Trigger Automatic Build
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in your details below to generate ready-to-paste git commands:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              GitHub Username / Organization
            </label>
            <input
              type="text"
              value={gitUsername}
              onChange={e => setGitUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. johndoe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              GitHub Repository Name
            </label>
            <input
              type="text"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. taskflow-android"
            />
          </div>
        </div>

        {/* Command Output Box */}
        <div className="relative">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            <pre>{pushCommand}</pre>
          </div>
          <button
            onClick={() => copyToClipboard(pushCommand, 'push-cmd')}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {copiedStep === 'push-cmd' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Commands
              </>
            )}
          </button>
        </div>

        {/* What Happens After Push */}
        <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-2xl p-4 text-xs space-y-2">
          <h4 className="font-bold text-indigo-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            Where to download the built APK &amp; AAB on GitHub:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1">
            <li>Go to your repo on GitHub and click the <strong>Actions</strong> tab.</li>
            <li>Click the running workflow: <strong>"Android Build &amp; Release Pipeline"</strong>.</li>
            <li>Once the run completes (green checkmark), scroll down to the <strong>Artifacts</strong> section.</li>
            <li>
              Click <strong className="text-emerald-400">Android-APK</strong> to download the real debug APK, or <strong className="text-cyan-400">Android-AAB</strong> for Play Store release bundle!
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
