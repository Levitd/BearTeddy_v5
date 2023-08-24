import React from "react";
import ScreenWidthWrapper from "../ScreenWidthWrapper";
import useHeightReacher from "../../hooks/useHeightReacher";
const NavBarWrapper = ({ children }) => {
    const offsetBlurHeight = 40;
    const { isReached } = useHeightReacher(offsetBlurHeight);
    return (
        <div
            className={
                "fixed bottom-0 lg:sticky lg:top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 " +
                (!isReached
                    ? "bg-slate-200/95 supports-backdrop-blur:bg-white/65"
                    : "bg-white supports-backdrop-blur:bg-white/95")
            }
        >
            <ScreenWidthWrapper>
                <div className='py-2 px-2 lg:py-4 lg:px-4'>
                    <div className='relative flex items-center'>{children}</div>
                </div>
            </ScreenWidthWrapper>
        </div>
    );
};

export default NavBarWrapper;
