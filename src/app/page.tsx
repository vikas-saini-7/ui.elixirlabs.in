import Image from "next/image";
import brandLogo from '@/assets/elixir-ui-logo.svg'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <Image
        src={brandLogo}
        alt="Elixir UI Logo"
        width={100}
        height={100}
        className="mb-6"
      />
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Coming Soon...
      </h1>
      <p className="text-gray-600 text-center mt-2 text-lg">
        We&apos;re working hard to launch something amazing.
      </p>
    </main>
  );
}
