import { AlertType } from "@/shared/types";
import { FC } from "react";

interface AlertIconProps {
  type: AlertType;
  className?: string;
}

export const AlertIcon: FC<AlertIconProps> = ({
  type,
  className,
}) => {
  switch (type) {
    case AlertType.Success:
      return (
        <svg className={className} width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="2.5" width="16" height="16" rx="8" fill="url(#paint0_linear_12666_19520)" stroke="url(#paint1_linear_12666_19520)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M5.18311 10.8513L5.84049 10.0392L7.54826 12.1488L11.2925 7.5236L11.9499 8.33566L7.54826 13.7729L5.18311 10.8513Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_12666_19520" x1="17" y1="19" x2="0" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#009B0A" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#009B0A" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="paint1_linear_12666_19520" x1="0" y1="2" x2="17" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#009B0A" stopOpacity="0.5"/>
              <stop offset="1" stopColor="#009B0A" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case AlertType.Error:
      return (
        <svg className={className} width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="2.5" width="16" height="16" rx="8" fill="url(#paint0_linear_12666_19527)" stroke="url(#paint1_linear_12666_19527)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.1363 13.7936L5.20207 7.85945L5.86035 7.20117L11.7945 13.1354L11.1363 13.7936Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M11.7976 7.85934L5.86336 13.7935L5.20508 13.1353L11.1393 7.20106L11.7976 7.85934Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_12666_19527" x1="17" y1="19" x2="0" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DE0F3E" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#DE0F3E" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="paint1_linear_12666_19527" x1="0" y1="2" x2="17" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DE0F3E" stopOpacity="0.5"/>
              <stop offset="1" stopColor="#DE0F3E" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case AlertType.Warning:
      return (
        <svg className={className} width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="2.5" width="16" height="16" rx="8" fill="url(#paint0_linear_12666_19536)" stroke="url(#paint1_linear_12666_19536)"/>
          <path d="M8.8652 12.3868H8.1653C8.10834 12.3868 8.06119 12.3425 8.0575 12.2858L7.77353 7.62497C7.76045 7.42181 7.82997 7.22814 7.96921 7.07961C8.24695 6.78341 8.75159 6.78257 9.03028 7.07793C9.16942 7.22518 9.23956 7.4178 9.22785 7.62012L8.973 12.2852C8.96973 12.3421 8.92248 12.3868 8.8652 12.3868Z" fill="white"/>
          <path d="M8.49996 14.3969C8.15091 14.3969 7.86694 14.1129 7.86694 13.764C7.86694 13.4148 8.15091 13.1309 8.49996 13.1309C8.8489 13.1309 9.13287 13.4148 9.13287 13.764C9.13287 14.1129 8.8489 14.3969 8.49996 14.3969Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_12666_19536" x1="17" y1="19" x2="0" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA02E" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#FFA02E" stopOpacity="0.5"/>
            </linearGradient>
            <linearGradient id="paint1_linear_12666_19536" x1="0" y1="2" x2="17" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA02E" stopOpacity="0.5"/>
              <stop offset="1" stopColor="#FFA02E" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}
