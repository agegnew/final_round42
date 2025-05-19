"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaDiscord, FaTrophy, FaStar, FaFire, FaCrown, FaMedal } from "react-icons/fa";
import { BsArrowRight, BsTrophyFill, BsLightningCharge } from "react-icons/bs";
import React from "react";

interface Team {
  name: string;
  logo: string;
  score: number;
  xpBonus: number;
  color: string;
  borderColor: string;
  questProgress: number;
  rank: number;
  streak: number;
}

interface Quest {
  title: string;
  description: string;
  xp: number;
  status: string;
  progress: number;
  icon: React.ReactNode;
  deadline: string;
}

interface TopPerformer {
  name: string;
  team: string;
  xp: number;
  quote: string;
  avatar: string;
  achievements: string[];
}

// Dummy data for the leaderboard
const teams: Team[] = [
  {
    name: "Falcon",
    logo: "/falcon.png",
    score: 1250,
    xpBonus: 15,
    color: "from-red-600 to-red-900",
    borderColor: "border-red-500",
    questProgress: 75,
    rank: 1,
    streak: 5,
  },
  {
    name: "Leopard",
    logo: "/leopard.png",
    score: 1180,
    xpBonus: 12,
    color: "from-teal-600 to-purple-900",
    borderColor: "border-teal-500",
    questProgress: 60,
    rank: 2,
    streak: 3,
  },
  {
    name: "Oryx",
    logo: "/oryx.png",
    score: 1100,
    xpBonus: 10,
    color: "from-cyan-600 to-cyan-900",
    borderColor: "border-cyan-500",
    questProgress: 45,
    rank: 3,
    streak: 2,
  },
  {
    name: "Wolf",
    logo: "/wolf.png",
    score: 980,
    xpBonus: 8,
    color: "from-orange-600 to-indigo-900",
    borderColor: "border-orange-500",
    questProgress: 30,
    rank: 4,
    streak: 1,
  },
];

// Dummy data for quests
const quests: Quest[] = [
  {
    title: "Daily Challenge",
    description: "Complete 5 coding exercises",
    xp: 500,
    status: "In Progress",
    progress: 60,
    icon: <BsLightningCharge className="text-yellow-400" />,
    deadline: "2 hours left",
  },
  {
    title: "Weekly Project",
    description: "Build a full-stack application",
    xp: 2000,
    status: "Not Started",
    progress: 0,
    icon: <FaCrown className="text-purple-400" />,
    deadline: "5 days left",
  },
  {
    title: "Team Collaboration",
    description: "Participate in 3 team reviews",
    xp: 800,
    status: "Completed",
    progress: 100,
    icon: <FaMedal className="text-blue-400" />,
    deadline: "Completed",
  },
];

// Dummy data for top performers
const topPerformers: TopPerformer[] = [
  {
    name: "Alex Chen",
    team: "Falcon",
    xp: 2500,
    quote: "Dominated the arena today!",
    avatar: "/avatars/avatar1.svg",
    achievements: ["First Place", "5 Day Streak", "Perfect Score"],
  },
  {
    name: "Sarah Park",
    team: "Leopard",
    xp: 2300,
    quote: "Unstoppable force!",
    avatar: "/avatars/avatar2.svg",
    achievements: ["Second Place", "3 Day Streak", "Team MVP"],
  },
  {
    name: "Marcus Lee",
    team: "Oryx",
    xp: 2100,
    quote: "Rising through the ranks!",
    avatar: "/avatars/avatar3.svg",
    achievements: ["Third Place", "2 Day Streak", "Most Improved"],
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-200">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.25,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [null, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 10 + 10,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-block p-2 px-4 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <FaFire className="text-orange-400" />
                  Live Competition
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
              Coalition Arena
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-slate-300">
              Rise Through the Ranks
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Live XP Battles. Daily Glory. One Champion.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167, 139, 250, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                View Leaderboard
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-slate-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Coalition Dashboard */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Live Coalition Dashboard</h2>
            <p className="text-slate-400">Real-time competition tracking and team performance</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-br ${team.color} p-6 rounded-xl border ${team.borderColor} shadow-lg relative overflow-hidden group cursor-pointer`}
                onClick={() => setActiveTeam(team)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={team.logo}
                        alt={`${team.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        {team.rank === 1 && (
                          <FaCrown className="text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm opacity-80">Score: {team.score}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">XP Bonus</span>
                      <span className="font-bold">+{team.xpBonus}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${team.questProgress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-white/80 h-2 rounded-full"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaFire className="text-orange-400" />
                      <span>{team.streak} Day Streak</span>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily/Weekly Quests Panel */}
      <section className="py-20 bg-slate-900/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Active Quests</h2>
            <p className="text-slate-400">Complete challenges to earn XP and climb the ranks</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map((quest, index) => (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-700/50">
                      {quest.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
                      <p className="text-slate-400">{quest.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-violet-500/20 text-violet-300">
                    {quest.xp} XP
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${quest.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-violet-500 h-2 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-sm ${
                      quest.status === "Completed" ? "text-green-400" :
                      quest.status === "In Progress" ? "text-yellow-400" :
                      "text-slate-400"
                    }`}>
                      {quest.status}
                    </span>
                    <span className="text-sm text-slate-400">{quest.deadline}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brag Wall */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Top Performers</h2>
            <p className="text-slate-400">Meet the champions leading the competition</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={performer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={performer.avatar}
                      alt={performer.name}
                      fill
                      className="rounded-full object-cover ring-2 ring-violet-500/50"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{performer.name}</h3>
                    <p className="text-sm text-slate-400">{performer.team}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-slate-300 italic">"{performer.quote}"</p>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <FaStar />
                    <span className="font-bold">{performer.xp} XP</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {performer.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Our Story
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Team
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Careers
                  </motion.a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Rules</h4>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Competition
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Code of Conduct
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Guidelines
                  </motion.a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <FaDiscord className="text-indigo-400" />
                    Discord
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <FaTrophy className="text-yellow-400" />
                    Leaderboard
                  </motion.a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Support
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Feedback
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Report Issue
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>© 2024 Coalition Arena. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Team Detail Modal */}
      <AnimatePresence>
        {activeTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveTeam(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gradient-to-br ${activeTeam.color} p-8 rounded-xl border ${activeTeam.borderColor} shadow-2xl max-w-lg w-full`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 relative">
                  <Image
                    src={activeTeam.logo}
                    alt={`${activeTeam.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{activeTeam.name}</h3>
                  <p className="text-lg opacity-80">Rank #{activeTeam.rank}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Team Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-80">Current Score</p>
                      <p className="text-xl font-bold">{activeTeam.score}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">XP Bonus</p>
                      <p className="text-xl font-bold">+{activeTeam.xpBonus}%</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Win Streak</p>
                      <p className="text-xl font-bold">{activeTeam.streak} Days</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Quest Progress</p>
                      <p className="text-xl font-bold">{activeTeam.questProgress}%</p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  onClick={() => setActiveTeam(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 