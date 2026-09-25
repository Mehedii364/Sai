import React, { useState, useEffect } from 'react';
import {
  Check,
  Plus,
  Trash2,
  Search,
  X,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  Settings as SettingsIcon,
  Wifi,
  BatteryCharging,
  Smartphone,
  Sparkles,
  Sun,
  Moon,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Engineering' | 'Design' | 'Marketing' | 'Operations' | 'Personal';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
  estimatedHours: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Configure Automated Gradle Pipeline',
    description: 'Set up GitHub Actions to compile assembleDebug APK and bundleRelease AAB with artifact uploads',
    category: 'Engineering',
    priority: 'Urgent',
    status: 'completed',
    dueDate: 'Today',
    estimatedHours: 3
  },
  {
    id: '2',
    title: 'Implement Material 3 Jetpack Compose UI',
    description: 'Design responsive home dashboard, category chips, animated state changes, and dark mode support',
    category: 'Design',
    priority: 'High',
    status: 'in_progress',
    dueDate: 'Tomorrow',
    estimatedHours: 5
  },
  {
    id: '3',
    title: 'Release Signing Keystore Security Audit',
    description: 'Verify GitHub Secrets isolation for JKS passwords, alias keys, and production builds',
    category: 'Operations',
    priority: 'High',
    status: 'todo',
    dueDate: 'Oct 2',
    estimatedHours: 2
  },
  {
    id: '4',
    title: 'App Bundle AAB Store Distribution',
    description: 'Prepare Google Play Console internal testing track submission parameters',
    category: 'Marketing',
    priority: 'Medium',
    status: 'todo',
    dueDate: 'Oct 5',
    estimatedHours: 4
  }
];

export const AndroidEmulator: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentTab, setCurrentTab] = useState<'tasks' | 'analytics' | 'settings'>('tasks');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<Task['category']>('Engineering');
  const [newPriority, setNewPriority] = useState<Task['priority']>('Medium');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');
  const [newHours, setNewHours] = useState('3');
  const [formError, setFormError] = useState('');

  // Clock state
  const [currentTime, setCurrentTime] = useState('10:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleStatus = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const nextStatus =
            task.status === 'todo'
              ? 'in_progress'
              : task.status === 'in_progress'
              ? 'completed'
              : 'todo';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Task title is required');
      return;
    }
    const created: Task = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'todo',
      dueDate: newDueDate || 'Today',
      estimatedHours: parseInt(newHours, 10) || 2
    };
    setTasks([created, ...tasks]);
    setNewTitle('');
    setNewDescription('');
    setFormError('');
    setIsCreatingTask(false);
  };

  const handleAndroidBack = () => {
    if (isCreatingTask) {
      setIsCreatingTask(false);
      setFormError('');
    } else if (currentTab !== 'tasks') {
      setCurrentTab('tasks');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const pendingCount = tasks.filter(t => t.status === 'todo').length;
  const urgentCount = tasks.filter(t => t.priority === 'Urgent').length;
  const totalHours = tasks.reduce((acc, t) => acc + t.estimatedHours, 0);
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-6">
      {/* Phone Hardware Mockup */}
      <div className="relative">
        {/* Device Outer Frame (Pixel Style) */}
        <div className="w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10 flex flex-col relative select-none">
          {/* Top Notch / Camera Hole */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-30 border border-slate-800"></div>

          {/* Android Screen Container */}
          <div
            className={`w-full h-full rounded-[38px] overflow-hidden flex flex-col relative transition-colors duration-200 ${
              isDarkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
            }`}
          >
            {/* Status Bar */}
            <div className="px-6 pt-3 pb-1 flex items-center justify-between text-xs font-medium opacity-90 z-20">
              <span className="font-semibold">{currentTime}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-tight">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">98%</span>
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Android Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-2 relative scrollbar-none">
              {isCreatingTask ? (
                /* Create Task Screen */
                <div className="animate-in fade-in duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setIsCreatingTask(false)}
                      className={`p-2 rounded-full ${
                        isDarkTheme ? 'hover:bg-slate-800' : 'hover:bg-slate-200'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-bold">New Task</h2>
                  </div>

                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 opacity-80">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={e => {
                          setNewTitle(e.target.value);
                          if (formError) setFormError('');
                        }}
                        placeholder="e.g. Test APK in Firebase Test Lab"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                          formError
                            ? 'border-red-500 bg-red-500/10'
                            : isDarkTheme
                            ? 'bg-slate-900 border-slate-800'
                            : 'bg-white border-slate-300'
                        }`}
                      />
                      {formError && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 opacity-80">
                        Description
                      </label>
                      <textarea
                        value={newDescription}
                        onChange={e => setNewDescription(e.target.value)}
                        placeholder="Add notes, specifications, or Gradle commands..."
                        rows={2}
                        className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 opacity-80">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {(['Engineering', 'Design', 'Marketing', 'Operations', 'Personal'] as const).map(
                          cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setNewCategory(cat)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                                newCategory === cat
                                  ? 'bg-indigo-600 text-white shadow-sm'
                                  : isDarkTheme
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              {cat}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 opacity-80">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['Low', 'Medium', 'High', 'Urgent'] as const).map(prio => (
                          <button
                            key={prio}
                            type="button"
                            onClick={() => setNewPriority(prio)}
                            className={`py-1 rounded-lg text-xs font-medium text-center transition-all ${
                              newPriority === prio
                                ? 'bg-indigo-600 text-white font-bold'
                                : isDarkTheme
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {prio}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider block mb-1 opacity-80">
                          Due Date
                        </label>
                        <input
                          type="text"
                          value={newDueDate}
                          onChange={e => setNewDueDate(e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-xl text-xs border ${
                            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider block mb-1 opacity-80">
                          Est. Hours
                        </label>
                        <input
                          type="number"
                          value={newHours}
                          onChange={e => setNewHours(e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-xl text-xs border ${
                            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      Save Task
                    </button>
                  </form>
                </div>
              ) : currentTab === 'tasks' ? (
                /* Tasks Screen */
                <div className="space-y-3 pb-16 animate-in fade-in duration-150">
                  {/* Progress Header Card */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isDarkTheme
                        ? 'bg-gradient-to-br from-indigo-950/60 to-slate-900 border-indigo-900/50'
                        : 'bg-gradient-to-br from-indigo-50 to-white border-indigo-200/80 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-sm">Sprint Progress</h3>
                        <p className="text-xs opacity-75">
                          {completedCount} of {tasks.length} tasks finished
                        </p>
                      </div>
                      <span className="text-xl font-black text-indigo-500">{progressPercent}%</span>
                    </div>
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden ${
                        isDarkTheme ? 'bg-slate-800' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search tasks..."
                      className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                        selectedCategory === null
                          ? 'bg-indigo-600 text-white font-medium'
                          : isDarkTheme
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      All ({tasks.length})
                    </button>
                    {(['Engineering', 'Design', 'Operations', 'Marketing'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white font-medium'
                            : isDarkTheme
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Task List */}
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-10 opacity-60">
                      <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-indigo-400" />
                      <p className="text-xs font-medium">No tasks found</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredTasks.map(task => {
                        const isDone = task.status === 'completed';
                        const isInProgress = task.status === 'in_progress';
                        return (
                          <div
                            key={task.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                              isDone
                                ? isDarkTheme
                                  ? 'bg-slate-900/40 border-slate-800/50 opacity-60'
                                  : 'bg-slate-100 border-slate-200 opacity-60'
                                : isDarkTheme
                                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                : 'bg-white border-slate-200 shadow-sm'
                            }`}
                          >
                            <button
                              onClick={() => handleToggleStatus(task.id)}
                              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : isInProgress
                                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                  : isDarkTheme
                                  ? 'border-slate-600 hover:border-indigo-400'
                                  : 'border-slate-300 hover:border-indigo-500'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                              {isInProgress && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>}
                            </button>

                            <div className="flex-1 min-w-0">
                              <h4
                                className={`text-xs font-semibold leading-snug ${
                                  isDone ? 'line-through text-slate-500' : ''
                                }`}
                              >
                                {task.title}
                              </h4>
                              {task.description && (
                                <p className="text-[11px] opacity-75 mt-0.5 line-clamp-2 leading-relaxed">
                                  {task.description}
                                </p>
                              )}
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[10px]">
                                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-medium">
                                  {task.category}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded font-medium ${
                                    task.priority === 'Urgent'
                                      ? 'bg-red-500/15 text-red-400'
                                      : task.priority === 'High'
                                      ? 'bg-amber-500/15 text-amber-400'
                                      : 'bg-slate-500/15 text-slate-400'
                                  }`}
                                >
                                  {task.priority}
                                </span>
                                <span className="opacity-60">• {task.dueDate}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-slate-500 hover:text-red-400 p-1 opacity-70 hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : currentTab === 'analytics' ? (
                /* Analytics Screen */
                <div className="space-y-4 pb-16 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-bold text-base">Productivity Stats</h3>
                    <p className="text-xs opacity-70">Team sprint metrics and load</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className={`p-3 rounded-xl border ${
                        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wide">
                        Completion Rate
                      </span>
                      <p className="text-2xl font-black text-emerald-400 mt-1">{progressPercent}%</p>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wide">
                        In Progress
                      </span>
                      <p className="text-2xl font-black text-cyan-400 mt-1">{inProgressCount}</p>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wide">
                        Urgent Tasks
                      </span>
                      <p className="text-2xl font-black text-rose-400 mt-1">{urgentCount}</p>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wide">
                        Total Workload
                      </span>
                      <p className="text-2xl font-black text-indigo-400 mt-1">{totalHours} hrs</p>
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border space-y-3 ${
                      isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <h4 className="text-xs font-bold">Status Breakdown</h4>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span>Completed</span>
                        <span className="font-semibold text-emerald-400">{completedCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400"
                          style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span>In Progress</span>
                        <span className="font-semibold text-cyan-400">{inProgressCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400"
                          style={{ width: `${tasks.length ? (inProgressCount / tasks.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span>Pending Backlog</span>
                        <span className="font-semibold text-amber-400">{pendingCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400"
                          style={{ width: `${tasks.length ? (pendingCount / tasks.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Settings Screen */
                <div className="space-y-4 pb-16 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-bold text-base">App Settings</h3>
                    <p className="text-xs opacity-70">Configuration & Device Specifications</p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border space-y-3 ${
                      isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {isDarkTheme ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                        <div>
                          <p className="text-xs font-semibold">Dark Theme</p>
                          <p className="text-[10px] opacity-70">Toggle Material 3 Dark Palette</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsDarkTheme(!isDarkTheme)}
                        className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                          isDarkTheme ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            isDarkTheme ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>

                  {/* Android Package Specifications */}
                  <div
                    className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                      isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <h4 className="font-bold text-xs flex items-center gap-1.5 text-indigo-400">
                      <Smartphone className="w-3.5 h-3.5" />
                      Build Metadata
                    </h4>
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-[11px]">
                      <span className="opacity-70">Package ID</span>
                      <span className="font-mono font-semibold">com.apex.taskflow</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-[11px]">
                      <span className="opacity-70">Target SDK</span>
                      <span className="font-semibold">Android 14 (API 34)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-[11px]">
                      <span className="opacity-70">Min SDK</span>
                      <span className="font-semibold">Android 7.0 (API 24)</span>
                    </div>
                    <div className="flex justify-between py-1 text-[11px]">
                      <span className="opacity-70">Gradle Plugin</span>
                      <span className="font-semibold">8.2.2</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Action Button (FAB) for Tasks screen */}
            {currentTab === 'tasks' && !isCreatingTask && (
              <button
                onClick={() => setIsCreatingTask(true)}
                className="absolute right-5 bottom-16 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/40 flex items-center justify-center transition-all z-20 hover:scale-105 active:scale-95 cursor-pointer"
                title="Create New Task"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}

            {/* Compose Bottom Navigation Bar */}
            <div
              className={`h-14 border-t px-6 flex items-center justify-around z-10 transition-colors ${
                isDarkTheme ? 'bg-slate-900/95 border-slate-800/80' : 'bg-white/95 border-slate-200'
              }`}
            >
              <button
                onClick={() => {
                  setCurrentTab('tasks');
                  setIsCreatingTask(false);
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentTab === 'tasks' ? 'text-indigo-500 font-bold scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px]">Tasks</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('analytics');
                  setIsCreatingTask(false);
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentTab === 'analytics' ? 'text-indigo-500 font-bold scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-[10px]">Analytics</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('settings');
                  setIsCreatingTask(false);
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentTab === 'settings' ? 'text-indigo-500 font-bold scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span className="text-[10px]">Settings</span>
              </button>
            </div>

            {/* Android Navigation Bar (Gesture Pill) */}
            <div className="h-4 flex items-center justify-center pb-1">
              <div
                className={`w-28 h-1 rounded-full cursor-pointer hover:scale-105 transition-all ${
                  isDarkTheme ? 'bg-slate-600' : 'bg-slate-400'
                }`}
                onClick={handleAndroidBack}
                title="Android System Gesture (Back)"
              ></div>
            </div>
          </div>
        </div>

        {/* Back Gesture Button Indicator on phone edge */}
        <button
          onClick={handleAndroidBack}
          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-lg border border-indigo-400 hover:scale-110 active:scale-95 transition-all z-30 flex items-center gap-1 text-xs"
          title="Hardware / Gesture Back Action"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Side Info & Live Controls */}
      <div className="max-w-md space-y-4">
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-slate-100">Live Kotlin Compose Emulator</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This interactive simulator runs the exact screen hierarchy, validations, and state transitions coded in <code className="text-indigo-300 bg-slate-900/80 px-1 py-0.5 rounded">MainActivity.kt</code>, <code className="text-indigo-300 bg-slate-900/80 px-1 py-0.5 rounded">HomeScreen.kt</code>, and <code className="text-indigo-300 bg-slate-900/80 px-1 py-0.5 rounded">CreateTaskScreen.kt</code>.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Theme Mode</span>
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="mt-1 flex items-center gap-1.5 font-semibold text-indigo-300 hover:underline cursor-pointer"
              >
                {isDarkTheme ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Hardware Back Gesture</span>
              <button
                onClick={handleAndroidBack}
                className="mt-1 flex items-center gap-1.5 font-semibold text-indigo-300 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Trigger Back
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Ready for Gradle Compilation</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            All Jetpack Compose dependencies, Material 3 BOM, and ProGuard rules are configured in <code className="text-emerald-300">app/build.gradle.kts</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
