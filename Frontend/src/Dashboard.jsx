import React from "react";
import { useNavigate } from "react-router-dom";
/* ================= COMPONENTS ================= */

const SidebarItem = ({ icon, label, active, danger }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
    ${active ? "bg-primary/20 text-primary" : "text-zinc-400"}
    ${danger && "text-red-500 mt-6"}`}
  >
    <span className="material-icons-round">{icon}</span>
    <span>{label}</span>
  </div>
);

const SongCard = ({ title, artist }) => (
  <div>
    <div className="aspect-square bg-zinc-800 rounded-xl mb-2" />
    <p className="font-semibold">{title}</p>
    <p className="text-xs text-zinc-400">{artist}</p>
  </div>
);

const HistoryItem = ({ title, time }) => (
  <div className="flex items-center gap-4 bg-zinc-800 p-4 rounded-xl mb-3">
    <div className="w-12 h-12 bg-zinc-700 rounded-lg" />
    <div className="flex-1">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-zinc-400">Played {time}</p>
    </div>
    <span className="material-icons-round text-zinc-400">more_vert</span>
  </div>
);

const BottomIcon = ({ icon, active, danger }) => (
  <div
    className={`flex flex-col items-center text-xs
    ${active ? "text-primary" : "text-zinc-400"}
    ${danger && "text-red-500"}`}
  >
    <span className="material-icons-round">{icon}</span>
  </div>
);

/* ================= MAIN DASHBOARD ================= */

const Dashboard = () => {
  const usenavigate = useNavigate()
  return (
    <div className="min-h-screen bg-zinc-900 text-white">

      {/* DESKTOP SIDEBAR (FIXED) */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex w-72 bg-zinc-800 flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://i.pravatar.cc/100"
            className="w-12 h-12 rounded-full border-2 border-primary"
            alt="Profile"
          />
          <div>
            <h3 className="font-semibold">Alex Rivera</h3>
            <p className="text-xs text-zinc-400">Premium Member</p>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          <SidebarItem icon="dashboard" label="Dashboard" active />
          <SidebarItem icon="history" label="History" />
          <SidebarItem icon="explore" label="Explore More" />
        </nav>

        <SidebarItem icon="logout" label="Log Out" danger />
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-5 pb-24 lg:pb-10 lg:ml-72">

        {/* HEADER */}
        <header className="flex justify-between items-center py-6">
          <div>
            <p className="text-xs text-zinc-400">Welcome back</p>
            <h1 className="text-lg font-bold">Username</h1>
          </div>

          <button className="p-2 rounded-full bg-zinc-800">
            <span className="material-icons-round">notifications</span>
          </button>
        </header>

        {/* EXPRESSION ANALYSIS */}
        <section className="bg-zinc-800 border border-primary/30 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-primary font-bold">
              Expression Analysis
            </p>
            <h2 className="text-2xl font-bold mt-1">Feeling Joyful</h2>
            <p className="text-xs text-zinc-400 mt-1">
              ✨ Matching your energy...
            </p>
          </div>

          <img
            src="https://i.pravatar.cc/150"
            className="w-20 h-20 rounded-xl grayscale"
            alt="Emotion"
          />
        </section>

        {/* TOP RECOMMENDATION */}
        <section className="mt-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Top Recommendation</h2>
            <span className="text-primary text-sm">View All</span>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              className="h-[320px] w-full object-cover"
              alt="Song"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="bg-primary text-xs px-2 py-1 rounded">
                  PERFECT MATCH
                </span>
                <h3 className="text-3xl font-bold mt-2">Midnight City</h3>
                <p className="text-zinc-300">M83 • Synthwave</p>
              </div>

              <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons-round text-3xl ml-1">
                  play_arrow
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SIMILAR VIBES */}
        <section className="mt-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Similar Vibes</h2>
            <span className="text-xs text-zinc-400">Based on analysis</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <SongCard title="Electric Feel" artist="MGMT" />
            <SongCard title="Starlight" artist="Muse" />
            <SongCard title="Waves" artist="Kanye West" />
            <SongCard title="Golden Dusk" artist="Nature Synth" />
          </div>
        </section>

        {/* RECENT HISTORY */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Recent History</h2>
          <HistoryItem title="Blinding Lights" time="2h ago" />
          <HistoryItem title="Tame Impala" time="5h ago" />
        </section>
      </main>

      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-zinc-800 border-t border-zinc-700 py-3 flex justify-around">
        <BottomIcon icon="dashboard" active />
        <BottomIcon icon="history" />
        <BottomIcon icon="explore" />
        <BottomIcon icon="logout" danger />
      </nav>
    </div>
  );
};

export default Dashboard;