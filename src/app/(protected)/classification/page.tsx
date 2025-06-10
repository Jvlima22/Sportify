import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ClassificationClient from "./_components/ClassificationClient";

const mockPlayers = [
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

const Classification = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return <ClassificationClient players={mockPlayers} />;
};

export default Classification;
