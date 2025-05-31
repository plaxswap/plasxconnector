import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    // <Svg viewBox="0 0 96 96" {...props}>
    //   <circle cx="48" cy="48" r="48" fill="#9331d1" />
    //   <path
    //     d="M1250,2500L1250,2500c688,0,1250-563,1250-1250l0,0C2500,562,1937,0,1250,0l0,0C562,0,0,563,0,1250l0,0    C0,1938,563,2500,1250,2500z"
    //     fill="white"
    //   />
    // </Svg> //icon wmatic
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAclBMVEVHcEyDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReaDReb///+CQ+aBQuaNU+iuhe+FSOe6l/H9/P/h0vnn2/r59/6bauuUXuqJTefayPju5vykd+307v3SvPbDpPPKsPWQIALsAAAAEHRSTlMA7jl5ARC84m74Lydcj8mhteuEDgAAAkxJREFUSMedVunWqyAMBHe7iYBbtdb1/V/xsrthv/bmT+s5GZJMkgEAduY7UfKAMUIxfCSR44OP5l3dAKLFYhhEV+/c/3IP0cHC++XkdN+1uAuIa03MCdCpBc7x/FuIPlh421XiRRB9NBh5W/8Y/WHxBnGD6E+Dt1W9S/4YYXxWh6ncN/yQNpun5gwSaHZdc3oz1mnaFZTYEa7qr0qIvKYhFVZluTVIeBUM3eXxbfZkvnXHQfXYWEPcOeAqAuDmXTLPZ0ZFWulQ5GchIvE3fzOvbqIEk1yGamyFRJoiTJlTpfghdC7TMiN2omTJHLByoZ38woRsqw8vQA6FAPQG0Fb8C+NXkW0pjiOQICugK1pCCxZoR3ECHlZA9iJ5X3HeBMULJAChDcAGSrJbc8wwvQwiBBAdi2bJi6YPc59VqWiP7goEMTrS2ha8E+W7z4kohEXS0WMFQK1oHBs7hulV01sio43sszAAtTq4EbGrvn3Ng8xbJ0h4dA2AQO8OVrGfnWQGLwzwsdGAUNEqY8+1GW9CqRXwUI2TkFxkzyvJs2oZlDUgARu9YCs6MtJxPtWpFcBG47ITsJy3dX2mmCz9xYbPtykkB1SKJoyywQC4DkQ2wGgaoTZdASKzojvrO9VqueksHDYrqkRgZ2qz35X4mSheROBQtqZYTvd6vqXMLEK2g8jWl1VvNsjVV4/9KuGt754rGTRSuRbjXV6ULkIbOl/I/UqX13L/+4Xi/XplMcSPlyJD/Hjt/sfF7nne6dPB+/ZxgmDgfnqcfPP8+QfaGX4nDGyUiwAAAABJRU5ErkJggg==" width={24} height={24}/>
  );
};

export default Icon;
