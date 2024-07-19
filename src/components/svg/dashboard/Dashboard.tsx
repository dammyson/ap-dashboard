export const Search = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.7277 20.4093L16.9404 15.6226C16.6972 15.3795 16.3537 15.3025 16.0433 15.3844L15.0162 14.3573C16.1749 13.0448 16.8848 11.3267 16.8848 9.44218C16.8848 5.33871 13.5464 2 9.44285 2C5.33871 2 2 5.33871 2 9.44285C2 13.5467 5.33871 16.885 9.44285 16.885C11.3271 16.885 13.0452 16.1755 14.3579 15.0164L15.385 16.0436C15.3031 16.354 15.3798 16.6972 15.6233 16.9406L20.41 21.727C20.5923 21.9093 20.8303 22 21.0688 22C21.3074 22 21.5457 21.909 21.7277 21.727C22.0914 21.3633 22.0914 20.7733 21.7277 20.4093L21.7277 20.4093ZM2.93193 9.44254C2.93193 5.85288 5.85235 2.93187 9.4426 2.93187C13.0328 2.93187 15.9529 5.85288 15.9529 9.44287C15.9529 13.0325 13.0322 15.9532 9.4426 15.9532C5.85302 15.9532 2.93193 13.0325 2.93193 9.44254Z'
        fill='#BEBFBF'
      />
    </svg>
  );
};

export const Bell = () => {
  return (
    <svg
      width='28'
      height='30'
      viewBox='0 0 28 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.37204 18.6937C1.08804 20.5523 2.35604 21.8417 3.90804 22.4843C9.8587 24.951 18.1387 24.951 24.0894 22.4843C25.6414 21.8417 26.9094 20.551 26.6254 18.6937C26.452 17.551 25.5894 16.6003 24.9507 15.671C24.1147 14.439 24.032 13.0963 24.0307 11.667C24.032 6.14433 19.5414 1.66699 13.9987 1.66699C8.45604 1.66699 3.96537 6.14433 3.96537 11.667C3.96537 13.0963 3.8827 14.4403 3.04537 15.671C2.40804 16.6003 1.5467 17.551 1.37204 18.6937Z'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.66406 24.334C9.27473 26.634 11.4321 28.334 13.9974 28.334C16.5641 28.334 18.7187 26.634 19.3307 24.334'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const ArrowRight = ({ className }: { className?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M2 12H22M22 12L13 3M22 12L13 21'
        stroke='url(#paint0_linear_3168_18332)'
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_3168_18332'
          x1='2'
          y1='12'
          x2='22'
          y2='12'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#2B539F' />
          <stop offset='1' stop-color='#BD3826' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ArrowUp = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.99974 2.95065C8.08863 2.95065 8.17196 2.96443 8.24974 2.99198C8.32752 3.01954 8.39974 3.06687 8.46641 3.13399L12.8664 7.53398C12.9997 7.66732 13.0664 7.82554 13.0664 8.00865C13.0664 8.19176 12.9997 8.35021 12.8664 8.48398C12.7331 8.61732 12.5775 8.68398 12.3997 8.68398C12.222 8.68398 12.0664 8.61732 11.9331 8.48398L8.66641 5.21732L8.66641 12.684C8.66641 12.8729 8.60241 13.0284 8.47441 13.1507C8.34641 13.2729 8.18818 13.334 7.99974 13.334C7.81085 13.334 7.65241 13.27 7.52441 13.142C7.39641 13.014 7.33263 12.8558 7.33307 12.6673L7.33307 5.21732L4.06641 8.48398C3.93307 8.61732 3.77752 8.68398 3.59974 8.68398C3.42196 8.68398 3.26641 8.61732 3.13307 8.48398C2.99974 8.35065 2.93307 8.19221 2.93307 8.00865C2.93307 7.82509 2.99974 7.66687 3.13307 7.53398L7.53307 3.13399C7.59974 3.06732 7.67196 3.01998 7.74974 2.99198C7.82752 2.96398 7.91085 2.95021 7.99974 2.95065Z'
        fill='#1EB564'
      />
    </svg>
  );
};

export const ArrowDown = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.00026 13.0493C7.91137 13.0493 7.82804 13.0356 7.75026 13.008C7.67248 12.9805 7.60026 12.9331 7.53359 12.866L3.13359 8.46602C3.00026 8.33268 2.93359 8.17446 2.93359 7.99135C2.93359 7.80824 3.00026 7.64979 3.13359 7.51602C3.26693 7.38268 3.42248 7.31602 3.60026 7.31602C3.77804 7.31602 3.93359 7.38268 4.06693 7.51602L7.33359 10.7827L7.33359 3.31602C7.33359 3.12713 7.39759 2.97157 7.52559 2.84935C7.65359 2.72713 7.81182 2.66602 8.00026 2.66602C8.18915 2.66602 8.34759 2.73002 8.47559 2.85802C8.60359 2.98602 8.66737 3.14424 8.66693 3.33268V10.7827L11.9336 7.51602C12.0669 7.38268 12.2225 7.31602 12.4003 7.31602C12.578 7.31602 12.7336 7.38268 12.8669 7.51602C13.0003 7.64935 13.0669 7.80779 13.0669 7.99135C13.0669 8.1749 13.0003 8.33313 12.8669 8.46602L8.46693 12.866C8.40026 12.9327 8.32804 12.98 8.25026 13.008C8.17248 13.036 8.08915 13.0498 8.00026 13.0493Z'
        fill='#D02626'
      />
    </svg>
  );
};

export const Slider = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 12V4M19 20V17M5 20V16M19 13V4M12 7V4M12 20V11'
        stroke='#23539F'
        strokeLinecap='round'
      />
      <path
        d='M5 16C6.10457 16 7 15.1046 7 14C7 12.8954 6.10457 12 5 12C3.89543 12 3 12.8954 3 14C3 15.1046 3.89543 16 5 16Z'
        stroke='#23539F'
        strokeLinecap='round'
      />
      <path
        d='M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z'
        stroke='#23539F'
        strokeLinecap='round'
      />
      <path
        d='M19 17C20.1046 17 21 16.1046 21 15C21 13.8954 20.1046 13 19 13C17.8954 13 17 13.8954 17 15C17 16.1046 17.8954 17 19 17Z'
        stroke='#23539F'
        strokeLinecap='round'
      />
    </svg>
  );
};

export const OptionsVertical = () => {
  return (
    <svg
      width='3'
      height='11'
      viewBox='0 0 3 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='1.375' cy='1.375' r='1.375' fill='#23539F' />
      <circle cx='1.375' cy='5.5' r='1.375' fill='#23539F' />
      <circle cx='1.375' cy='9.625' r='1.375' fill='#23539F' />
    </svg>
  );
};

export const BarChart = () => {
  return (
    <svg
      width='81'
      height='86'
      viewBox='0 0 81 86'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_3168_19008)'>
        <ellipse cx='59' cy='22.8' rx='9' ry='8.8' fill='#357AF6' />
      </g>
      <path
        d='M54.9492 24.9992C54.9492 24.6955 55.1955 24.4492 55.4992 24.4492C55.803 24.4492 56.0492 24.6955 56.0492 24.9992V27.7492H54.9492V24.9992Z'
        fill='#DEE5F1'
      />
      <path
        d='M57.1484 18.3996C57.1484 18.0959 57.3947 17.8496 57.6984 17.8496C58.0022 17.8496 58.2484 18.0959 58.2484 18.3996V27.7496H57.1484V18.3996Z'
        fill='#DEE5F1'
      />
      <path
        d='M59.3477 23.3488C59.3477 23.0451 59.5939 22.7988 59.8977 22.7988C60.2014 22.7988 60.4477 23.0451 60.4477 23.3488V27.7488H59.3477V23.3488Z'
        fill='#DEE5F1'
      />
      <path
        d='M61.5508 21.1496C61.5508 20.8459 61.797 20.5996 62.1008 20.5996C62.4045 20.5996 62.6508 20.8459 62.6508 21.1496V27.7496H61.5508V21.1496Z'
        fill='#DEE5F1'
      />
      <defs>
        <filter
          id='filter0_d_3168_19008'
          x='0'
          y='-32'
          width='118'
          height='117.6'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='25' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_3168_19008'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_3168_19008'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export const Fall = () => {
  return (
    <svg
      width='160'
      height='77'
      viewBox='0 0 160 77'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M92.5113 31.0938C126.574 11.0348 152.566 32.5237 159 55.0441V76.4253H1V1C7.79185 11.0757 21.3756 72.984 92.5113 31.0938Z'
        fill='url(#paint0_linear_4727_3201)'
      />
      <path
        d='M159 55.0441C152.566 32.5237 126.574 11.0348 92.5113 31.0938C21.3756 72.984 7.79185 11.0757 0.999996 1'
        stroke='#D02626'
        stroke-width='1.42986'
        stroke-linecap='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4727_3201'
          x1='80'
          y1='1'
          x2='80'
          y2='76.4253'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#D02626' stop-opacity='0.08' />
          <stop offset='1' stop-color='#D02626' stop-opacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Rise = () => {
  return (
    <svg
      width='157'
      height='111'
      viewBox='0 0 157 111'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M67.2262 47.2928C33.8099 19.1026 8.31222 49.3022 2 80.9515V111H157V5C150.337 19.1601 137.011 106.164 67.2262 47.2928Z'
        fill='url(#paint0_linear_4727_18063)'
      />
      <path
        d='M1 76.9515C7.31222 45.3022 32.8099 15.1026 66.2262 43.2928C136.011 102.164 149.337 15.1601 156 1'
        stroke='#1EB564'
        stroke-width='2'
        stroke-linecap='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4727_18063'
          x1='79.5'
          y1='5'
          x2='79.5'
          y2='111'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#1EB564' stop-opacity='0.08' />
          <stop offset='1' stop-color='#1EB564' stop-opacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Dot = ({ className }: { className?: string }) => {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='6' cy='6' r='6' fill='currentColor' />
    </svg>
  );
};

export const Bar = () => {
  return (
    <svg
      width='9'
      height='11'
      viewBox='0 0 9 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.949219 7.99922C0.949219 7.69546 1.19546 7.44922 1.49922 7.44922C1.80298 7.44922 2.04922 7.69546 2.04922 7.99922V10.7492H0.949219V7.99922Z'
        fill='#DEE5F1'
      />
      <path
        d='M3.14844 1.39961C3.14844 1.09585 3.39468 0.849609 3.69844 0.849609C4.00219 0.849609 4.24844 1.09585 4.24844 1.39961V10.7496H3.14844V1.39961Z'
        fill='#DEE5F1'
      />
      <path
        d='M5.34766 6.34883C5.34766 6.04507 5.5939 5.79883 5.89766 5.79883C6.20141 5.79883 6.44766 6.04507 6.44766 6.34883V10.7488H5.34766V6.34883Z'
        fill='#DEE5F1'
      />
      <path
        d='M7.55078 4.14961C7.55078 3.84585 7.79702 3.59961 8.10078 3.59961C8.40454 3.59961 8.65078 3.84585 8.65078 4.14961V10.7496H7.55078V4.14961Z'
        fill='#DEE5F1'
      />
    </svg>
  );
};
