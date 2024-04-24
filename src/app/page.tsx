import { GeneralIcon } from "@/assets/GeneralIcon";
import { SmartTokens } from "@/containers/SmartTokens";
import { GeneralIconType } from "@/shared/types";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full z-10 p-4">
      <div className="flex flex-col items-center w-[800px] max-w-full gap-10 mt-6">
        <div className="flex items-center gap-2 font-space-grotesk w-full">
          <div className="text-3xl font-bold">
            <span className="text-grey-gradient">Smart Tokens on </span><span className="text-green-gradient">Coreum</span>
          </div>
          <GeneralIcon type={GeneralIconType.Info} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
        </div>
        <SmartTokens />
      </div>
      <div className="absolute bottom-0 z-0">
        <Image src="/images/bg-image-bottom.png" width={1440} height={900} alt="bg image bottom" />
      </div>
    </main>
  );
}
