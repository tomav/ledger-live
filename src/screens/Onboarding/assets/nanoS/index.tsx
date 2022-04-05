import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const NanoSSVG = ({ fill, ...props }: SvgProps) => (
  <Svg width={28} height={140} viewBox="0 0 18 90" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5002 10.7414V34.4944L9.28471 38.1873V14.3086L3.5002 10.7414ZM4.23353 34.0925V12.0552L8.55137 14.7179V36.8491L4.23353 34.0925Z"
      fill={fill}
    />
    <Path
      d="M5.11937 73.659L5.11973 73.191C5.12006 72.7487 5.2133 72.5621 5.71454 72.852L6.3732 73.233C6.87436 73.5228 6.96731 73.8172 6.96697 74.2594L6.96663 74.7274L5.11937 73.659Z"
      fill={fill}
    />
    <Path
      d="M5.12598 65.2229L5.12545 65.9099L5.97387 66.4006L5.9744 65.7136C5.97466 65.3744 5.88525 65.2067 5.62392 65.0556L5.4736 64.9686C5.21939 64.8216 5.12624 64.888 5.12598 65.2229Z"
      fill={fill}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.205144 4.09852L6.38373 0.633301L17.8759 7.26841L17.6965 42.7158C17.8322 43.0703 17.9464 43.461 17.9464 43.7719C17.9464 58.9885 17.9465 85.5709 17.9465 85.5709L13.0363 88.7422V53.7061L16.9489 51.2927V45.5282L16.9489 45.5263L17.1404 7.69056L6.37847 1.47705L1.67243 4.1164L12.303 10.3684V89.0552L0.203201 82.3355L0.202981 4.10294L0.200195 4.1013L0.202981 4.09974V4.09852H0.205144ZM11.5696 10.7879V46.4561C10.8405 44.2085 9.59919 42.2394 7.98989 41.0116C6.59667 39.9486 5.14102 39.3191 3.66591 39.6384C2.47651 39.8958 1.56369 40.3339 0.936316 41.354L0.936315 4.53423L11.5696 10.7879ZM4.79886 61.164L4.79852 61.6019L3.51687 60.8607L3.51492 63.4281L3.1498 63.2169L3.15209 60.2116L4.79886 61.164ZM8.94942 66.5715L8.58429 66.3603L8.58624 63.7929L7.30468 63.0517L7.30502 62.6138L8.9517 63.5662L8.94942 66.5715ZM8.57307 81.1375L8.5711 83.7049L7.28954 82.9637L7.28921 83.4016L8.93598 84.354L8.93827 81.3487L8.57307 81.1375ZM7.33345 71.8091C7.33325 72.0538 7.25431 72.2573 7.1074 72.3527C6.8853 72.4905 6.52719 72.4123 6.04389 72.1328C5.54274 71.8429 5.18483 71.4856 4.9738 71.0929C4.83079 70.8299 4.75578 70.5459 4.756 70.2583C4.75644 69.6658 5.06815 69.451 5.56221 69.6938L5.56186 70.166C5.22533 69.9757 5.10349 70.0297 5.10321 70.4204L5.10314 70.5063C5.10285 70.9055 5.20657 71.1674 5.70772 71.4572L6.38077 71.8465C6.87838 72.1343 6.98596 72.0033 6.98626 71.604L6.98633 71.5095C6.98662 71.1103 6.86856 70.883 6.50701 70.6739L6.33519 70.5745L6.33463 71.326L6.00529 71.1355L6.00617 69.9721L7.29846 70.7195L7.29816 71.1144L7.06189 70.9778L7.06184 71.0378C7.24786 71.2656 7.33363 71.5515 7.33345 71.8091ZM4.78573 78.5052L4.78539 78.9431L7.29133 80.3924L7.29283 78.4175L6.9635 78.227L6.96233 79.7641L4.78573 78.5052ZM3.50373 78.2062L3.50177 80.7736L4.78341 81.5149L4.78309 81.9528L3.13631 81.0003L3.13861 77.995L3.50373 78.2062ZM7.29503 75.9055L6.96569 75.715L6.96454 77.2306L6.19841 76.7875L6.19943 75.4651L5.87009 75.2746L5.86909 76.597L5.11726 76.1622L5.11838 74.7111L4.78903 74.5206L4.7876 76.4097L7.29354 77.859L7.29503 75.9055ZM6.97158 67.9869L7.30091 68.1773L7.29942 70.1309L4.79348 68.6815L4.79492 66.7924L5.12426 66.9829L5.12316 68.434L5.87497 68.8688L5.87598 67.5465L6.20531 67.7369L6.20432 69.0593L6.97042 69.5024L6.97158 67.9869ZM7.29643 74.4114C7.29705 73.5913 6.7782 72.9863 6.04431 72.5619C5.29969 72.1312 4.79111 72.1635 4.7905 72.9706L4.7898 73.898L7.29573 75.3474L7.29643 74.4114ZM6.30322 66.591L7.30198 67.1687L7.30164 67.598L4.7957 66.1487L4.79645 65.1827C4.7967 64.8264 4.87923 64.5992 5.0441 64.4884C5.17671 64.4019 5.34148 64.4113 5.52405 64.5169C5.81396 64.6846 6.05726 65.0443 6.12504 65.3971L6.17521 65.4261C6.21844 65.1074 6.36885 65.0827 6.76267 65.3105L7.30323 65.6232L7.3029 66.061L6.70505 65.7153C6.41861 65.5496 6.30396 65.6164 6.30371 65.947L6.30322 66.591ZM9.23383 51.9556C10.8055 50.9346 10.6951 47.9756 8.98711 45.3465C7.27916 42.7174 4.62048 41.4138 3.04878 42.4348C1.47709 43.4558 1.58755 46.4148 3.2955 49.0439C5.00346 51.673 7.66214 52.9766 9.23383 51.9556Z"
      fill={fill}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0423 14.4211L14.2375 15.0471C13.9405 15.2781 13.7669 15.6332 13.7669 16.0094V21.2746C13.7669 21.9297 14.5204 22.2983 15.0375 21.896L15.8424 21.2701C16.1393 21.0391 16.313 20.684 16.313 20.3078V15.0426C16.313 14.3874 15.5595 14.0189 15.0423 14.4211ZM15.5797 20.3078C15.5797 20.4577 15.5104 20.5992 15.3921 20.6912L14.5873 21.3172C14.5519 21.3447 14.5002 21.3195 14.5002 21.2746V16.0094C14.5002 15.8595 14.5694 15.718 14.6877 15.626L15.4925 15C15.528 14.9724 15.5797 14.9977 15.5797 15.0426V20.3078Z"
      fill={fill}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.313 30.4426C16.313 29.7874 15.5595 29.4189 15.0423 29.8211L14.2375 30.4471C13.9405 30.6781 13.7669 31.0332 13.7669 31.4094V36.6746C13.7669 37.3297 14.5204 37.6983 15.0375 37.296L15.8423 36.6701C16.1393 36.4391 16.313 36.084 16.313 35.7078V30.4426ZM15.3921 36.0912L14.5873 36.7172C14.5519 36.7448 14.5002 36.7195 14.5002 36.6746V31.4094C14.5002 31.2595 14.5694 31.118 14.6877 31.026L15.4925 30.4C15.528 30.3724 15.5797 30.3977 15.5797 30.4426V35.7078C15.5797 35.8577 15.5104 35.9992 15.3921 36.0912Z"
      fill={fill}
    />
  </Svg>
);

NanoSSVG.id = "nanoS";

export default NanoSSVG;