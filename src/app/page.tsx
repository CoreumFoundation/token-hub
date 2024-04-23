import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType } from "@/shared/types";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full z-10">
      <div className="flex flex-col items-center w-[800px] gap-10 mt-6">
        <div className="flex items-center gap-2 font-space-grotesk w-full">
          <div className="text-3xl font-bold">
            <span className="text-grey-gradient">Smart Tokens on </span><span className="text-green-gradient">Coreum</span>
          </div>
          <GeneralIcon type={GeneralIconType.Info} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
        </div>
        <div className="flex w-full bg-main-gradient py-6 px-10 rounded-3xl">
          Content
        </div>
      </div>
      <div className="absolute bottom-0 z-0">
        <Image src="/images/bg-image-bottom.png" width={1440} height={900} alt="bg image bottom" />
      </div>
    </main>
  );
}
