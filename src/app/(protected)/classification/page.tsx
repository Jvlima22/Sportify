"use client";

import React, { useState } from "react";
import { Trophy, Medal, Award, Users, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Player {
  id: number;
  name: string;
  team: string;
  goals: number;
  assists: number;
  wins: number;
  losses: number;
  matches: number;
  rating: number;
  position: string;
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    goals: 28,
    assists: 12,
    wins: 18,
    losses: 4,
    matches: 22,
    rating: 9.2,
    position: "Atacante",
  },
  {
    id: 2,
    name: "Lionel Messi",
    team: "Inter Miami",
    goals: 25,
    assists: 15,
    wins: 16,
    losses: 3,
    matches: 19,
    rating: 9.0,
    position: "Atacante",
  },
  {
    id: 3,
    name: "Erling Haaland",
    team: "Manchester City",
    goals: 32,
    assists: 8,
    wins: 20,
    losses: 2,
    matches: 22,
    rating: 8.9,
    position: "Atacante",
  },
  {
    id: 4,
    name: "Kylian Mbappé",
    team: "PSG",
    goals: 30,
    assists: 10,
    wins: 19,
    losses: 3,
    matches: 22,
    rating: 8.8,
    position: "Atacante",
  },
  {
    id: 5,
    name: "Kevin De Bruyne",
    team: "Manchester City",
    goals: 8,
    assists: 22,
    wins: 18,
    losses: 2,
    matches: 20,
    rating: 8.7,
    position: "Meio-campo",
  },
];

// eslint-disable-next-line @next/next/no-async-client-component
const Classification = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sortBy, setSortBy] = useState<"goals" | "assists" | "rating" | "wins">(
    "goals"
  );

  const sortedPlayers = [...mockPlayers].sort((a, b) => {
    switch (sortBy) {
      case "goals":
        return b.goals - a.goals;
      case "assists":
        return b.assists - a.assists;
      case "rating":
        return b.rating - a.rating;
      case "wins":
        return b.wins - a.wins;
      default:
        return b.goals - a.goals;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  const getWinRate = (wins: number, matches: number) => {
    return ((wins / matches) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-sportify-gradient rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-sportify-gradient bg-clip-text text-transparent">
            SPORTIFY
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Classificação de Jogadores
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acompanhe as estatísticas dos melhores jogadores e confira a
          classificação em tempo real
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { key: "goals", label: "Gols", icon: Target },
          { key: "assists", label: "Assistências", icon: TrendingUp },
          { key: "rating", label: "Rating", icon: Award },
          { key: "wins", label: "Vitórias", icon: Trophy },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() =>
              setSortBy(key as "goals" | "assists" | "rating" | "wins")
            }
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              sortBy === key
                ? "bg-sportify-gradient text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:bg-accent"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Ranking Table */}
      <Card className="sportify-card overflow-hidden">
        <CardHeader className="bg-sportify-gradient-light">
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-sportify-red" />
            <span>Classificação Geral</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Pos
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Jogador
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                    Gols
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                    Assist
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                    V/D
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                    Taxa
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player, index) => (
                  <tr
                    key={player.id}
                    className="border-b border-border hover:bg-accent/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground">
                          {player.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {player.team}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {player.position}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="font-bold text-lg text-sportify-red">
                        {player.goals}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="font-bold text-lg text-blue-600">
                        {player.assists}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-green-600 font-semibold">
                            {player.wins}
                          </span>
                          <span className="text-muted-foreground mx-1">/</span>
                          <span className="text-red-600 font-semibold">
                            {player.losses}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm font-semibold text-foreground">
                        {getWinRate(player.wins, player.matches)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge
                        className={`sportify-badge ${
                          player.rating >= 9
                            ? "bg-yellow-100 text-yellow-800"
                            : player.rating >= 8.5
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {player.rating}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Classification;
