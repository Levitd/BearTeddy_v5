import React, { useState } from "react";
import StyledNavLink from "../StyledNavLink";
import NavBarDropdown from "./NavBarDropdown";
import NavBarWrapper from "./NavBarWrapper";
import NavBarLinkList from "./NavBarLinkList";
import NavBarLogo from "./NavBarLogo";
import NavBarSelectLang from "./NavBarSelectLang";
import { FormattedMessage } from "react-intl";
import { Bars3Icon, MagnifyingGlassCircleIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
// import { getIsLoggedIn } from "../../store/users";
// import useLogout from "../../hooks/useLogout";
import { useLocation } from "react-router-dom";
import configFile from "../../config.json";
import ShoppingCard from "./ShoppingCard";

const NavBar = ({ handleChange, shop, isLoggedIn }) => {
    const currentPage = useLocation().pathname;
    // const isLoggedIn = useSelector(getIsLoggedIn());
    // const handleLogout = useLogout();
    const [activeSearch, setActiveSearch] = useState(false);

    const handleClickBurgerMenu = ({ target }) => {
        if (target && (target.nodeName === "A" || target.nodeName === "IMG" || target.nodeName === "svg" || target.nodeName === "SPAN" || target.nodeName === "path")) {
            const burgerMenu = document.querySelector(".burger_menu");
            setTimeout(() => {
                burgerMenu.classList.toggle('hidden');
            }, burgerMenu.classList.contains("burger_menu_show") ? 180 : 0);
            burgerMenu.classList.toggle('burger_menu_show');
            burgerMenu.classList.toggle('burger_menu_hidden');

            if (burgerMenu.classList.contains("burger_menu_show")) {
                burgerMenu.addEventListener("click", handleClickBurgerMenu);
            } else {
                burgerMenu.removeEventListener("click", handleClickBurgerMenu);
            }
        }
    };
    const handleClickSearchLine = ({ target }) => {
        const serchLineEl = document.querySelector(".search_line");
        serchLineEl.classList.toggle("hidden");
        serchLineEl.classList.toggle("flex");
        setActiveSearch((prevState => !prevState));
        const searchButtoninNavBarEl = document.querySelector("#searchButtoninNavBar").firstChild;
        searchButtoninNavBarEl.classList.toggle("text-blue-500");
        searchButtoninNavBarEl.classList.toggle("text-blue-800");
    };
    const handleClickFiltersLine = () => {
        const serchLineEl = document.querySelector(".filters");
        serchLineEl.classList.toggle("hidden");
        serchLineEl.classList.toggle("flex");
        setActiveSearch((prevState => !prevState));
        const searchButtoninNavBarEl = document.querySelector("#filtersButtoninNavBar").firstChild;
        searchButtoninNavBarEl.classList.toggle("text-blue-500");
        searchButtoninNavBarEl.classList.toggle("text-blue-800");
    };
    return (
        <>
            <BurgerMenu handleClose={handleClickBurgerMenu} isLoggedIn={isLoggedIn} shop={shop} activeSearch={activeSearch} />
            <NavBarWrapper>
                <NavBarLogo
                    link='/'
                    src={configFile.imgPathFirebaseStorige+'rr-logo.svg?alt=media&token=300599d6-9f76-4c4f-afd5-e7575150f84c'}
                    label='BearTeddy.fun'
                />
                <NavBarSelectLang handleChange={handleChange} />
                <NavBarLinkList>
                    <ShoppingCard/>
                    <StyledNavLink to='/autors' show="hidden lg:block"><FormattedMessage id='autors' /></StyledNavLink>
                    {currentPage === "/" &&
                        <>
                            <button onClick={handleClickSearchLine} id="searchButtoninNavBar" className="lg:hidden m-0"><MagnifyingGlassCircleIcon className="h-6 w-6 text-blue-500" /></button>
                            <button onClick={handleClickFiltersLine} id="filtersButtoninNavBar" className="lg:hidden"><AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-500" /></button>
                        </>
                    }
                    <button onClick={handleClickBurgerMenu} className="lg:hidden"><Bars3Icon className="h-6 w-6 text-blue-500" /></button>

                    {isLoggedIn ? (
                        <>
                            <NavBarDropdown shop={shop} />
                            {/* <StyledNavLink to='/' styleType='button' show="hidden lg:block" onClick={handleLogout}><FormattedMessage id='logout' /> </StyledNavLink> */}
                        </>
                    ) : (
                        <StyledNavLink to='/auth/login' styleType='button' show="hidden lg:block">
                            <FormattedMessage id='login' />
                        </StyledNavLink>
                    )}
                </NavBarLinkList>
            </NavBarWrapper>
        </>
    );
};

export default NavBar;
