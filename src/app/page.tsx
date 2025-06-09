"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // Adicionando o tipo explícito para TypeScript
  const handleNavigation = (route: string) => {
    router.push(route); // Redireciona para a rota especificada
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {/* Logo */}
      <div className="mt-2 mb-6 mr-60">
        <Image src="/Logo.png" alt="Logo" width={100} height={100} />
      </div>

      {/* Imagens sobrepostas */}
      <div className="relative w-[290px] h-[414px] flex justify-center">
        {/* Imagem de futebol */}
        <Image
          src="/futebol.png"
          alt="Imagem de futebol"
          width={290}
          height={414}
          className="absolute z-10 ml-[-100px] mt-[-60px]"
        />

        {/* Imagem de vetor abaixo da imagem de futebol */}
        <Image
          src="/vector.png"
          alt="Imagem de vetor"
          width={220}
          height={550}
          className="absolute top-10 z-0 ml-50 mt-[-220px]"
        />
      </div>

      {/* Texto */}
      <h1 className="text-2xl font-bold text-center text-black mb-4 mt-[-120px]">
        Registre gols <br /> e conquiste a liderança!
      </h1>
      <p className="text-gray-700 text-center mb-6 max-w-xs">
        Registre os gols, acompanhe a performance dos jogadores e confira a
        classificação ao vivo diretamente no seu celular.
      </p>

      {/* Botões de navegação */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          className="bg-[#FF5050] text-white font-bold py-3 px-6 text-lg rounded-md hover:bg-red-600 transition"
          onClick={() => handleNavigation("/authentication")}
        >
          Começar
        </button>
      </div>
    </div>
  );
}
