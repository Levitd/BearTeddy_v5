import React from "react";
import StyledBurgerLink from "./StyledBurgerLink";
import NavBarLogo from "../NavBar/NavBarLogo";
import { XMarkIcon } from '@heroicons/react/24/solid'
import { FormattedMessage } from "react-intl";
import useLogout from "../../hooks/useLogout";
import configFile from "../../config.json";

const BurgerMenu = ({ label = "burger_menu", isLoggedIn, shop }) => {
    const handleLogout = useLogout();
    return (
        <div className={`${label} text-lg burger_menu_hidden w-80 h-full z-50 fixed right-0 top-0 bg-black/95 flex flex-col hidden`}>
            <div className="flex flex-row flex-nowrap place-content-between">
                <NavBarLogo
                    link='/'
                    src={configFile.imgPathFirebaseStorige+'rr-logo.svg?alt=media&token=300599d6-9f76-4c4f-afd5-e7575150f84c'}
                    label='BearTeddy.fun'
                    modifyStyle="text-white"
                />
                <button >
                    <XMarkIcon className="h-10 w-10 pt-1 text-blue-500" />
                </button>
            </div>
            <hr className="my-2" />
            <StyledBurgerLink to='/autors'><FormattedMessage id='autors' /></StyledBurgerLink>
            {!isLoggedIn &&
                <StyledBurgerLink to='/auth/login'><FormattedMessage id='login' /></StyledBurgerLink>
            }
            {isLoggedIn && <>
                <span className="pl-4 text-slate-700"><FormattedMessage id='personal_area' /></span>
                <StyledBurgerLink show="pl-8" to='/personalArea'><FormattedMessage id='personal_data' /></StyledBurgerLink>
                {shop &&
                    <>
                        <StyledBurgerLink show="pl-8" to='/myshop'><FormattedMessage id='shop_settings' /></StyledBurgerLink>
                        <StyledBurgerLink show="pl-12" to='/myshop/products'><FormattedMessage id='my_works' /></StyledBurgerLink>
                    </>
                }
                {!shop &&
                    <StyledBurgerLink show="pl-8" to='/create_myshop'><FormattedMessage id='create_shop' /></StyledBurgerLink>
                }
                <StyledBurgerLink onClick={handleLogout} show="pl-4" to=""><FormattedMessage id='logout' /></StyledBurgerLink>
            </>
            }
        </div>
    )
};

export default BurgerMenu;

// class Example extends React.Component {
//     showSettings(event) {
//         event.preventDefault();
//     }

//     render() {
//         // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
//         return (
//             <Menu>
//                 <a id="home" className="menu-item" href="/">Home</a>
//                 <a id="about" className="menu-item" href="/about">About</a>
//                 <a id="contact" className="menu-item" href="/contact">Contact</a>
//                 <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
//             </Menu>
//         );
//     }
// }
