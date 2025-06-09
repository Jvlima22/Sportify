import { Clock, Calendar } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div className="px-4 py-6">
      {/* Seção Destaques */}
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-green-200 to-green-50 border border-green-200">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-700 text-sm font-medium">
                Quarta-feira
              </span>
              <span className="text-gray-500 text-sm">•</span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="h-4 w-4" />
                <span>Qua 08/06 • 20:00</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pontue e suba no ranking
            </h2>

            <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Ver partidas
            </button>
          </div>
        </div>
      </div>

      {/* Seção Melhores Jogadores com Ranking */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Melhores Jogadores</h3>
          <button className="text-sm text-green-700 font-medium">
            Ver tudo →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            {
              name: "Neymar Junior",
              medal: "🥇",
              image: "https://images8.alphacoders.com/929/929651.jpg",
            },
            {
              name: "Lionel Messi",
              medal: "🥈",
              image: "https://wallpaperaccess.com/full/1976382.jpg",
            },
            {
              name: "Cristiano Ronaldo",
              medal: "🥉",
              image: "https://images7.alphacoders.com/408/408982.jpg",
            },
          ].map((player, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center relative shadow-sm"
            >
              <div className="relative inline-block">
                <img src={player.image} className="w-20 h-20 rounded-full" />
                <span className="absolute top-0 left-0 text-2xl -ml-2 -mt-2">
                  {player.medal}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mt-2">{player.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Times que Mais Venceram */}
      <div className="mt-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Times que mais venceram
            </h3>
            <button className="text-sm text-green-700 font-medium">
              Ver tudo →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Real Madrid", rating: "★★★★★" },
              { name: "Barcelona", rating: "★★★★☆" },
              { name: "Bayern Munich", rating: "★★★★☆" },
            ].map((team, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center"
              >
                <h4 className="font-medium text-gray-900">{team.name}</h4>
                <p className="text-sm text-gray-500">{team.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seção Próximas Partidas */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Próximas partidas
          </h3>
          <button className="text-sm text-green-600 font-medium">
            Ver tudo →
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-lg">⚽</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Brasil vs Argentina</h4>
              <p className="text-sm text-gray-500">Seg 09/06 • 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-lg">⚽</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Brasil vs Argentina</h4>
              <p className="text-sm text-gray-500">Seg 09/06 • 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-lg">⚽</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Brasil vs Argentina</h4>
              <p className="text-sm text-gray-500">Seg 09/06 • 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
