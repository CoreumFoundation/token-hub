import { FOOTER_NAVIGATION } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-footer w-full z-10 py-3 px-6 md:pb-16 md:px-28" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="flex md:grid md:grid-cols-3 w-full justify-between gap-10 flex-col pt-16 border-t border-[#101216]">
        <div className="md:col-span-2 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <Image
              className="h-6"
              src="/images/logo-footer.svg"
              alt="Company name"
              height={24}
              width={120}
            />
            <div className="flex items-center gap-x-6">
              {FOOTER_NAVIGATION.social.map((item) => (
                <Link key={item.name} href={item.href} target="_blank" className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <p className="hidden md:flex text-[10px] leading-[15px] text-[#5E6773] font-normal">
            &copy; 2021 - 2024 Coreum Development Foundation Limited. All rights reserved
          </p>
        </div>
        <div className="flex flex-col gap-5 min-w-full md:min-w-[40%]">
          <h3 className="text-xs font-semibold leading-6 text-[#5E6773] uppercase">Products</h3>
          <ul role="list" className="space-y-3">
            {FOOTER_NAVIGATION.products.map((item) => (
              <li key={item.name}>
                <Link href={item.href} target="_blank" className="flex items-center text-base leading-6 text-[#9FA2AC] hover:text-white">
                  {item.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.492 9.46915H8.43281V8H17.0029V16.5701H15.5337V10.5051L8.03885 18L7 16.9612L14.492 9.46915Z" fill="url(#paint0_linear_10730_29519)"/>
                    <defs>
                      <linearGradient id="paint0_linear_10730_29519" x1="7" y1="8" x2="7" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#25D695"/>
                        <stop offset="1" stopColor="#046C44"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="flex md:hidden text-[10px] leading-[15px] text-[#5E6773] font-normal">
          &copy; 2021 - 2024 Coreum Development Foundation Limited. All rights reserved
        </p>
      </div>
    </footer>
  )
}
