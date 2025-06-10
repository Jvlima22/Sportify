"use client";

import { useEffect, useState } from "react";

interface ClassificationData {
  position: number;
  team: string;
  points: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

const ClassificationClient = () => {
  const [classification, setClassification] = useState<ClassificationData[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        // TODO: Implement API call to fetch classification data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classification:", error);
        setLoading(false);
      }
    };

    fetchClassification();
  }, []);

  if (loading) {
    return <div>Carregando classificação...</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Pos</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-center">P</th>
            <th className="p-2 text-center">J</th>
            <th className="p-2 text-center">V</th>
            <th className="p-2 text-center">E</th>
            <th className="p-2 text-center">D</th>
            <th className="p-2 text-center">GP</th>
            <th className="p-2 text-center">GC</th>
            <th className="p-2 text-center">SG</th>
          </tr>
        </thead>
        <tbody>
          {classification.map((team) => (
            <tr key={team.team} className="border-b border-border">
              <td className="p-2">{team.position}</td>
              <td className="p-2">{team.team}</td>
              <td className="p-2 text-center">{team.points}</td>
              <td className="p-2 text-center">{team.games}</td>
              <td className="p-2 text-center">{team.wins}</td>
              <td className="p-2 text-center">{team.draws}</td>
              <td className="p-2 text-center">{team.losses}</td>
              <td className="p-2 text-center">{team.goalsFor}</td>
              <td className="p-2 text-center">{team.goalsAgainst}</td>
              <td className="p-2 text-center">{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassificationClient;
