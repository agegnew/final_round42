"use client";

import React from 'react';
import TeamMascot from '@/components/TeamMascot';
import LeaderboardGlobe from '@/components/3d/LeaderboardGlobe';

interface Team {
  id: number;
  name: string;
  score: number;
  progress: number;
}

const teams: Team[] = [
  { id: 1, name: 'Falcon', score: 850, progress: 85 },
  { id: 2, name: 'Leopard', score: 720, progress: 72 },
  { id: 3, name: 'Oryx', score: 680, progress: 68 },
  { id: 4, name: 'Wolf', score: 650, progress: 65 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Coalition Arena
            </h1>
            <p className="text-slate-400 text-lg">
              Real-time battle statistics and team rankings
            </p>
          </div>

          {/* 3D Leaderboard Globe */}
          <div className="max-w-6xl mx-auto">
            <LeaderboardGlobe />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
      </section>

      {/* Additional Dashboard Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Live Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <TeamMascot team={team.name} className="w-16 h-16" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                      <p className="text-sm text-gray-400">Team {team.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{team.score}</p>
                    <p className="text-sm text-gray-400">points</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{team.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${team.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 