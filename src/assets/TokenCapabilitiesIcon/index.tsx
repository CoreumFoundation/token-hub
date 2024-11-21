import { TokenCapabilityType } from "@/shared/types";
import { FC } from "react";

interface TokenCapabilitiesIconProps {
  type: TokenCapabilityType;
  className?: string;
}

export const TokenCapabilitiesIcon: FC<TokenCapabilitiesIconProps> = ({
  type,
  className,
}) => {
  switch (type) {
    case TokenCapabilityType.Mint:
      return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_11980_84232)">
              <g filter="url(#filter0_di_11980_84232)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15.4444 11.5351C15.7732 11.7432 15.7733 12.254 15.4445 12.4622C14.2425 13.2232 13.2243 14.2419 12.4638 15.4441C12.2558 15.7731 11.7447 15.7731 11.5365 15.4442C10.7758 14.2419 9.75731 13.2233 8.55513 12.4621C8.22637 12.254 8.22643 11.7433 8.55524 11.5352C9.75727 10.7746 10.7757 9.75649 11.5367 8.55485C11.7449 8.22615 12.2555 8.22622 12.4636 8.55495C13.2243 9.75657 14.2425 10.7746 15.4444 11.5351Z" fill="url(#paint0_linear_11980_84232)"/>
              </g>
          </g>
          <defs>
            <filter id="filter0_di_11980_84232" x="-1" y="-1" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84232"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84232" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84232"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84232" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
            <clipPath id="clip0_11980_84232">
              <rect y="6.10352e-05" width="24" height="24" rx="12" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      );
    case TokenCapabilityType.Burn:
      return (
        <svg className={className} width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_11980_84254)">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.27569 15.1506C7.35181 11.4548 7.58582 11.4079 6.65006 9.34946C6.65006 9.34946 8.84889 10.566 8.9425 12.6711C10.8104 10.498 11.0959 5.35922 9.03589 4.25006C9.03589 4.25006 14.8842 6.96368 14.4629 12.2502C14.4629 12.2502 15.5158 11.0341 15.1885 9.11606C21.4972 18.0168 16.0752 23.4235 11.2837 23.2458C7.93359 23.1217 4.93941 19.7406 6.27568 15.1507L6.27569 15.1506Z" fill="url(#paint0_linear_11980_84254)"/>
          </g>
          <defs>
            <filter id="filter0_di_11980_84254" x="1.95001" y="0.250061" width="20.0967" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84254"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84254" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84254"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84254" x1="11.9983" y1="4.25006" x2="11.9983" y2="23.2501" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case TokenCapabilityType.Freeze:
      return (
        <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_11980_84258)">
            <path d="M21.2752 14.7241C21.1924 14.4179 20.8773 14.2367 20.5711 14.3189L19.0682 14.7211H19.0684C18.7115 14.7959 18.3397 14.7472 18.0138 14.5832L15.7956 13.2875C15.6736 13.2446 15.592 13.1293 15.592 13C15.592 12.8707 15.6736 12.7555 15.7956 12.7126L18.0138 11.431V11.4312C18.3397 11.2673 18.7115 11.2186 19.0684 11.2931L20.5713 11.6954H20.5711C20.8773 11.7778 21.1924 11.5966 21.2752 11.2903L21.5626 10.1783H21.5624C21.6448 9.87208 21.4634 9.55702 21.1574 9.47441L20.2953 9.24732C19.9914 9.16214 19.8133 8.84786 19.8958 8.5434L20.1229 7.68133C20.2053 7.37507 20.0239 7.06002 19.7178 6.97741L18.6058 6.68999C18.2996 6.60761 17.9845 6.789 17.9017 7.09526L17.4995 8.59808V8.59788C17.387 8.94443 17.1587 9.24188 16.8531 9.43988L14.6349 10.7215C14.3619 10.8794 14.1378 10.7501 14.1378 10.434L14.1376 7.87392C14.1581 7.50993 14.301 7.16378 14.5427 6.89122L15.6433 5.79067C15.8661 5.56659 15.8661 5.2046 15.6433 4.98033L14.8301 4.16716C14.606 3.94428 14.244 3.94428 14.0198 4.16716L13.3934 4.79068C13.1693 5.01356 12.8073 5.01356 12.5831 4.79068L11.9567 4.16716C11.7326 3.94428 11.3707 3.94428 11.1464 4.16716L10.3332 4.98033C10.1105 5.20461 10.1105 5.5666 10.3332 5.79067L11.4338 6.89122C11.6799 7.1622 11.8266 7.50854 11.8505 7.87392V10.434C11.8505 10.7501 11.6264 10.8794 11.3534 10.7215L9.13525 9.43988H9.13505C8.8292 9.24186 8.60091 8.94442 8.48844 8.59788L8.08618 7.09506V7.09526C8.0491 6.94593 7.9537 6.81806 7.82141 6.73969C7.68912 6.66133 7.53098 6.63928 7.38226 6.67856L6.27027 6.96598V6.96578C5.96421 7.04856 5.78282 7.36364 5.8652 7.66991L6.09229 8.53198H6.09209C6.17447 8.83803 5.99307 9.15309 5.68702 9.2359L4.82495 9.46299V9.46279C4.5189 9.54557 4.33751 9.86064 4.41989 10.1669L4.70731 11.2789H4.70711C4.78988 11.585 5.10496 11.7664 5.41124 11.684L6.91406 11.2817H6.91386C7.27083 11.2072 7.64262 11.2557 7.96854 11.4196L10.2039 12.7126C10.326 12.7555 10.4076 12.8707 10.4076 13C10.4076 13.1293 10.326 13.2445 10.2039 13.2874L7.98578 14.569V14.5688C7.65988 14.7328 7.28807 14.7815 6.9311 14.7069L5.42828 14.3046H5.42848C5.27936 14.2655 5.12081 14.2878 4.98853 14.3668C4.85605 14.4457 4.76104 14.5744 4.72437 14.7241L4.43695 15.8361H4.43715C4.35477 16.1424 4.53616 16.4572 4.84222 16.5401L5.70428 16.7671V16.7669C6.00112 16.8523 6.1775 17.1568 6.10374 17.4566L5.87665 18.3187C5.79427 18.6249 5.97566 18.94 6.28172 19.0226L7.39372 19.31C7.69998 19.3924 8.01503 19.211 8.09785 18.9047L8.50011 17.4019V17.4021C8.61255 17.0556 8.84084 16.7581 9.14651 16.5601L11.3647 15.2785C11.6376 15.1206 11.8617 15.2499 11.8617 15.566V18.1261H11.8619C11.8415 18.4901 11.6986 18.8362 11.4569 19.1088L10.3563 20.2093C10.1334 20.4334 10.1334 20.7954 10.3563 21.0197L11.1695 21.8328C11.3936 22.0557 11.7555 22.0557 11.9798 21.8328L12.6062 21.2093C12.8302 20.9864 13.1922 20.9864 13.4165 21.2093L14.0428 21.8328C14.2669 22.0557 14.6289 22.0557 14.8532 21.8328L15.6664 21.0197C15.889 20.7954 15.889 20.4334 15.6664 20.2093L14.5658 19.1088C14.3197 18.8378 14.173 18.4915 14.1491 18.1261V15.566C14.1491 15.2499 14.3732 15.1206 14.6462 15.2785L16.8643 16.5601H16.8645C17.1704 16.7581 17.3987 17.0556 17.5111 17.4021L17.9134 18.9049V18.9047C17.9505 19.0541 18.0459 19.1819 18.1782 19.2603C18.3104 19.3387 18.4686 19.3607 18.6173 19.3214L19.7293 19.034V19.0342C20.0354 18.9514 20.2167 18.6364 20.1344 18.3301L19.9073 17.468H19.9075C19.8251 17.162 20.0065 16.8469 20.3125 16.7641L21.1746 16.537V16.5372C21.4807 16.4544 21.6621 16.1394 21.5797 15.8331L21.2752 14.7241Z" fill="url(#paint0_linear_11980_84258)"/>
          </g>
          <defs>
            <filter id="filter0_di_11980_84258" x="0.400024" y="0" width="25.1995" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84258"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84258" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84258"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84258" x1="12.9998" y1="4" x2="12.9998" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case TokenCapabilityType.Whitelist:
      return (
        <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_11980_84266)">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.9202 21.9783C5.41589 17.6251 4.37116 14.1915 4.35498 7.4436C4.35477 7.35447 4.42762 7.28047 4.51674 7.27905C8.73487 7.21211 12.2515 4.55439 12.8966 4.03723C12.9585 3.98759 13.0463 3.98759 13.1082 4.03723C13.7533 4.55439 17.2699 7.21211 21.4881 7.27905C21.5772 7.28047 21.65 7.35447 21.6498 7.4436C21.6337 14.1915 20.5889 17.6251 13.0846 21.9783C13.0348 22.0072 12.97 22.0072 12.9202 21.9783ZM13.0026 9.56131C13.9367 9.56131 14.694 10.3358 14.694 11.2915C14.694 11.8048 14.4755 12.2658 14.1285 12.5825C14.0469 12.6569 14.0021 12.7663 14.0231 12.8747L14.4947 15.3008C14.5633 15.6535 14.2931 15.9813 13.9338 15.9813H12.0712C11.7118 15.9813 11.4416 15.6535 11.5102 15.3008L11.982 12.8748C12.0031 12.7663 11.9583 12.6569 11.8767 12.5824C11.5297 12.2657 11.3112 11.8048 11.3112 11.2915C11.3112 10.3358 12.0685 9.56131 13.0026 9.56131Z" fill="url(#paint0_linear_11980_84266)"/>
          </g>
          <defs>
            <filter id="filter0_di_11980_84266" x="0.35498" y="0" width="25.2949" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84266"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84266" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84266"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84266" x1="13.0024" y1="4" x2="13.0024" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case TokenCapabilityType.IBC:
    case TokenCapabilityType.DisableSend:
      return (
        <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_11980_84262)">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.4433 4.69044C16.9807 5.22785 17.2043 5.9602 17.1143 6.65988C19.7909 7.97727 21.6327 10.7319 21.6327 13.9166C21.6327 14.6488 21.5353 15.3583 21.3529 16.0328C21.3623 16.0418 21.3717 16.051 21.381 16.0603C22.0715 16.7507 22.0715 17.8702 21.381 18.5606C20.9503 18.9913 20.3527 19.1533 19.7965 19.0467C18.314 20.8499 16.0659 22 13.5493 22C11.2379 22 9.1531 21.0299 7.67985 19.4745C6.70459 19.7241 5.62648 19.4671 4.86305 18.7037C3.71232 17.553 3.71232 15.6873 4.86305 14.5366C5.04801 14.3516 5.25144 14.1964 5.4674 14.0709C5.46644 14.0196 5.46596 13.9682 5.46596 13.9166C5.46596 9.82089 8.51212 6.4366 12.4625 5.90573C12.549 5.46046 12.7647 5.03531 13.1095 4.69044C14.0301 3.76985 15.5227 3.76985 16.4433 4.69044ZM20.6654 15.6249C20.0564 15.4323 19.3636 15.5774 18.8807 16.0603C18.1903 16.7507 18.1903 17.8702 18.8807 18.5606C18.9397 18.6196 19.0018 18.6735 19.0665 18.7224C17.7252 20.261 15.7508 21.2332 13.5493 21.2332C11.5638 21.2332 9.76293 20.4423 8.4447 19.1584C8.65365 19.0348 8.85063 18.8833 9.0302 18.7037C10.1809 17.553 10.1809 15.6873 9.0302 14.5366C8.27224 13.7786 7.20408 13.5199 6.23436 13.7604C6.30964 10.1664 8.97648 7.20961 12.4416 6.68337C12.5097 7.17386 12.7324 7.64701 13.1095 8.02416C14.0301 8.94475 15.5227 8.94475 16.4433 8.02416C16.6294 7.83799 16.778 7.62842 16.8888 7.40491C19.2504 8.61845 20.8659 11.0789 20.8659 13.9166C20.8659 14.5048 20.7965 15.0768 20.6654 15.6249Z" fill="url(#paint0_linear_11980_84262)"/>
          </g>
          <defs>
            <filter id="filter0_di_11980_84262" x="0" y="0" width="25.8989" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84262"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84262" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84262"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84262" x1="12.9494" y1="4" x2="12.9494" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case TokenCapabilityType.Block:
    case TokenCapabilityType.Soulbound:
      return (
        <svg className={className} width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_11980_84270)">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.7283 4C10.3969 4 10.1283 4.26863 10.1283 4.6V4.8026C10.1283 5.13397 10.3969 5.4026 10.7283 5.4026H13.2685C13.5999 5.4026 13.8685 5.13397 13.8685 4.8026V4.6C13.8685 4.26863 13.5999 4 13.2685 4H10.7283ZM7.43993 5.01301C6.2995 5.01301 5.375 5.93751 5.375 7.07794V19.2727C5.375 20.779 6.59604 22 8.10227 22H15.8945C17.4007 22 18.6217 20.779 18.6217 19.2727V7.07794C18.6217 5.93751 17.6972 5.01301 16.5568 5.01301H15.1464C14.7849 5.01301 14.4919 5.30606 14.4919 5.66756V7.02121H9.50486V5.66756C9.50486 5.30606 9.21181 5.01301 8.85032 5.01301H7.43993Z" fill="url(#paint0_linear_11980_84270)"/>
          </g>
          <defs>
            <filter id="filter0_di_11980_84270" x="1.375" y="0" width="21.2468" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11980_84270"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11980_84270" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11980_84270"/>
            </filter>
            <linearGradient id="paint0_linear_11980_84270" x1="11.9984" y1="4" x2="11.9984" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case TokenCapabilityType.Clawback:
      return (
        <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_103_4944)">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 13C4 8.03707 8.03742 4 13 4C17.9629 4 22 8.03707 22 13C22 17.9629 17.9629 22 13 22C8.03707 22 4 17.9629 4 13ZM13.6367 13.0878V8.421C13.6367 8.0694 13.3516 7.78437 13 7.78437C12.6484 7.78437 12.3634 8.0694 12.3634 8.421V13.4073C12.3634 13.6084 12.4584 13.7977 12.6197 13.9178L15.7592 16.2571C16.0411 16.4672 16.44 16.4089 16.6501 16.127C16.8601 15.845 16.8019 15.4462 16.5199 15.2361L13.6367 13.0878Z" fill="url(#paint0_linear_103_4944)"/>
          </g>
          <defs>
            <filter id="filter0_di_103_4944" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_103_4944"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_103_4944" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_103_4944"/>
            </filter>
            <linearGradient id="paint0_linear_103_4944" x1="13" y1="4" x2="13" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#5E6773"/>
            </linearGradient>
          </defs>
        </svg>
      );
      case TokenCapabilityType.Extension:
        return (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_di_130_5197)">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.2038 20.6789L14.2948 23.5878C14.1124 23.7588 13.8645 23.7466 13.709 23.5911L10.4938 20.3759C10.291 20.1731 10.356 19.8226 10.6202 19.7077C11.7373 19.2284 11.9786 17.6947 11.1397 16.8559C10.3017 16.0179 8.7541 16.2874 8.28756 17.376C8.17634 17.6412 7.82106 17.7032 7.6197 17.5018L4.40451 14.2866C4.24517 14.1273 4.24547 13.8703 4.40482 13.711L7.3251 10.7827C5.89297 9.8713 5.24183 7.94593 6.59636 6.5914C7.9347 5.25305 9.83566 5.87723 10.7939 7.31461L13.709 4.39958L13.7119 4.39655C13.8545 4.25015 14.1309 4.2461 14.2846 4.39986L17.2129 7.32015C17.3751 7.06538 17.5292 6.81369 17.7443 6.59866C18.7538 5.58912 20.3967 5.58393 21.4042 6.5914C22.3553 7.54255 22.3893 9.06122 21.4211 10.2217C21.2164 10.4674 20.957 10.6283 20.6927 10.8006L23.5926 13.7006C23.7552 13.8748 23.7431 14.1395 23.596 14.2866L20.675 17.2077C20.9299 17.3699 21.1818 17.5242 21.3969 17.7393C22.3956 18.738 22.4054 20.398 21.4042 21.3992C20.4029 22.4006 18.7433 22.391 17.7443 21.392C17.532 21.1797 17.372 20.9257 17.2038 20.6789Z" fill="url(#paint0_linear_130_5197)"/>
            </g>
            <defs>
              <filter id="filter0_di_130_5197" x="0.285156" y="0.285645" width="27.4258" height="27.4263" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_130_5197"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_130_5197" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="0.5"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.56 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_130_5197"/>
              </filter>
              <linearGradient id="paint0_linear_130_5197" x1="13.9978" y1="4.28564" x2="13.9978" y2="23.7119" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="#5E6773"/>
              </linearGradient>
            </defs>
          </svg>
        );
    default:
      return null;
  }
}
