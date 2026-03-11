import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState, FormEvent } from "react";
import { Id } from "../convex/_generated/dataModel";

type Priority = "low" | "medium" | "high";

interface Task {
  _id: Id<"tasks">;
  _creationTime: number;
  text: string;
  completed: boolean;
  priority: Priority;
  category?: string;
  userId: Id<"users">;
  createdAt: number;
}

function AuthForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch {
      setError(flow === "signIn" ? "Invalid credentials" : "Could not create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Art Deco Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Geometric Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 border-2 border-amber-500/20 rotate-45"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 md:w-40 md:h-40 border-2 border-emerald-500/20 rotate-12"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500/10 to-transparent rotate-45"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block relative">
            <div className="absolute -inset-4 border border-amber-500/30 rotate-3"></div>
            <div className="absolute -inset-4 border border-emerald-500/30 -rotate-3"></div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 tracking-tight">
              TASKDECO
            </h1>
          </div>
          <p className="mt-6 text-amber-100/60 font-body tracking-widest text-xs md:text-sm uppercase">
            Elegance in Organization
          </p>
        </div>

        {/* Auth Card */}
        <div className="relative">
          <div className="absolute -inset-px bg-gradient-to-br from-amber-500/50 via-transparent to-emerald-500/50 blur-sm"></div>
          <div className="relative bg-[#12121a] border border-amber-500/20 p-6 md:p-8 lg:p-10">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500"></div>

            <h2 className="text-xl md:text-2xl font-display font-bold text-amber-100 mb-6 md:mb-8 text-center">
              {flow === "signIn" ? "Welcome Back" : "Join the Elite"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-amber-200/80 text-xs uppercase tracking-widest mb-2 font-body">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-[#0a0a0f] border border-amber-500/30 px-4 py-3 md:py-4 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400 transition-colors font-body text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-amber-200/80 text-xs uppercase tracking-widest mb-2 font-body">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-[#0a0a0f] border border-amber-500/30 px-4 py-3 md:py-4 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400 transition-colors font-body text-sm md:text-base"
                  placeholder="Enter your password"
                />
              </div>
              <input name="flow" type="hidden" value={flow} />

              {error && (
                <div className="text-red-400 text-sm text-center py-2 border border-red-500/30 bg-red-500/10">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transform group-hover:scale-105 transition-transform"></div>
                <div className="relative px-6 py-3 md:py-4 font-display font-bold text-[#0a0a0f] uppercase tracking-widest text-sm md:text-base">
                  {isLoading ? "Processing..." : flow === "signIn" ? "Enter" : "Create Account"}
                </div>
              </button>
            </form>

            <div className="mt-6 md:mt-8 text-center">
              <button
                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                className="text-amber-400/60 hover:text-amber-400 transition-colors text-xs md:text-sm font-body tracking-wide"
              >
                {flow === "signIn" ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-6 md:mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-500/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#12121a] px-4 text-amber-100/40 tracking-widest font-body">or</span>
              </div>
            </div>

            <button
              onClick={() => signIn("anonymous")}
              className="mt-6 md:mt-8 w-full border border-emerald-500/40 px-6 py-3 md:py-4 text-emerald-400 hover:bg-emerald-500/10 transition-colors font-display uppercase tracking-widest text-xs md:text-sm"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskApp() {
  const { signOut } = useAuthActions();
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    await createTask({ text: newTaskText, priority: newTaskPriority });
    setNewTaskText("");
  };

  const filteredTasks = tasks?.filter((task: Task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter((t: Task) => t.completed).length || 0,
    active: tasks?.filter((t: Task) => !t.completed).length || 0,
  };

  const priorityColors = {
    high: "border-red-500 bg-red-500/10",
    medium: "border-amber-500 bg-amber-500/10",
    low: "border-emerald-500 bg-emerald-500/10",
  };

  const priorityLabels = {
    high: "HIGH",
    medium: "MED",
    low: "LOW",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-amber-500 rotate-45 flex items-center justify-center">
                <span className="font-display font-black text-amber-500 text-lg md:text-xl -rotate-45">T</span>
              </div>
            </div>
            <h1 className="font-display text-xl md:text-2xl font-black text-amber-100 tracking-tight">TASKDECO</h1>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 md:px-6 py-2 border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-colors font-body uppercase tracking-widest text-xs"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
          {[
            { label: "Total", value: stats.total, color: "amber" },
            { label: "Active", value: stats.active, color: "emerald" },
            { label: "Done", value: stats.completed, color: "violet" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className={`absolute -inset-px bg-gradient-to-br from-${stat.color}-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative bg-[#12121a] border border-amber-500/20 p-4 md:p-6 text-center">
                <div className="font-display text-2xl md:text-4xl font-black text-amber-100">{stat.value}</div>
                <div className="text-amber-100/40 uppercase tracking-widest text-[10px] md:text-xs font-body mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        <div className="relative mb-8 md:mb-12">
          <div className="absolute -inset-px bg-gradient-to-r from-amber-500/30 via-transparent to-emerald-500/30"></div>
          <form onSubmit={handleCreateTask} className="relative bg-[#12121a] border border-amber-500/20 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 bg-[#0a0a0f] border border-amber-500/30 px-4 py-3 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400 transition-colors font-body text-sm md:text-base"
              />
              <div className="flex gap-2 md:gap-4">
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                  className="bg-[#0a0a0f] border border-amber-500/30 px-3 md:px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-400 font-body uppercase tracking-widest text-xs min-w-[90px] md:min-w-[100px]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="px-6 md:px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a0a0f] font-display font-bold uppercase tracking-widest text-xs md:text-sm hover:from-amber-500 hover:to-amber-400 transition-all whitespace-nowrap"
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 md:px-6 py-2 border font-body uppercase tracking-widest text-xs transition-all ${
                filter === f
                  ? "border-amber-500 bg-amber-500/20 text-amber-100"
                  : "border-amber-500/20 text-amber-100/40 hover:border-amber-500/40 hover:text-amber-100/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3 md:space-y-4">
          {filteredTasks === undefined ? (
            <div className="text-center py-12 md:py-20">
              <div className="inline-block w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12 md:py-20 border border-dashed border-amber-500/20">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto border-2 border-amber-500/30 rotate-45 flex items-center justify-center mb-4 md:mb-6">
                <span className="text-amber-500/30 text-xl md:text-2xl -rotate-45">!</span>
              </div>
              <p className="text-amber-100/40 font-body text-sm md:text-base">
                {filter === "all" ? "No tasks yet. Create your first task above!" : `No ${filter} tasks`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task: Task, index: number) => (
              <div
                key={task._id}
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute -inset-px bg-gradient-to-r from-amber-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`relative bg-[#12121a] border-l-4 ${priorityColors[task.priority]} border border-amber-500/10 p-4 md:p-6 flex items-center gap-3 md:gap-4 ${task.completed ? "opacity-50" : ""}`}>
                  <button
                    onClick={() => toggleTask({ id: task._id })}
                    className={`w-6 h-6 md:w-7 md:h-7 border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      task.completed
                        ? "border-emerald-500 bg-emerald-500 text-[#0a0a0f]"
                        : "border-amber-500/40 hover:border-amber-500"
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-body text-sm md:text-base ${task.completed ? "line-through text-amber-100/40" : "text-amber-100"}`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                      <span className={`px-2 py-0.5 text-[10px] md:text-xs uppercase tracking-widest font-body ${
                        task.priority === "high" ? "text-red-400 bg-red-500/10" :
                        task.priority === "medium" ? "text-amber-400 bg-amber-500/10" :
                        "text-emerald-400 bg-emerald-500/10"
                      }`}>
                        {priorityLabels[task.priority]}
                      </span>
                      <span className="text-amber-100/30 text-[10px] md:text-xs font-body">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTask({ id: task._id })}
                    className="p-2 text-amber-100/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-500/10 py-6 md:py-8 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber-100/30 text-[10px] md:text-xs font-body tracking-wider">
            Requested by <span className="text-amber-400/50">@itsg73</span> · Built by <span className="text-emerald-400/50">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-amber-500/30 rotate-45 animate-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-emerald-500/30 -rotate-45 animate-pulse" style={{ animationDelay: "150ms" }}></div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <TaskApp /> : <AuthForm />;
}
