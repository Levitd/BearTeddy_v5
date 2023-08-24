import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { FormattedMessage } from "react-intl";
import StyledNavLink from "../StyledNavLink";
import useLogout from "../../hooks/useLogout";
// import configFile from "../../config.json";
import SpinnerLader from "../SpinnerLoader";
import ImgFileld from "../common/form/img";

// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }
const NavBarDropdown = ({ shop }) => {
    const user = useSelector(getCurrentUserData());
    const handleLogout = useLogout();
    return (
        <>
            {(!user && <SpinnerLader />)}
            {user &&
                <Menu as='div' className='relative border-l-2 hidden lg:block'>
                    <Menu.Button className='flex items-center w-full rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:text-blue-500 focus:outline-none '>
                        <ImgFileld path="imgProfilePathFirebaseStorige" file={`${(user.image.length>0) ? user.image[0].name : "no-image-icon.png"}`} token={user.image.length>0 ? user.image[0].token : "f7499845-a9dc-49f5-80ff-bb444a933d15"} addClass="inline-block h-8 rounded-xl pr-2 w-auto" />

                        {/* <img
                            src={configFile.imgProfilePath + user.profile}
                            className='inline-block h-6 rounded-xl pr-2 w-auto'
                            alt='Logo'
                        /> */}
                        <FormattedMessage id='personal_area' />
                        <ChevronDownIcon
                            className='-mr-1 ml-2 h-5 w-5'
                            aria-hidden='true'
                        />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-slate-200/80 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className={"flex flex-col"}>
                                <StyledNavLink show="pl-4" to='/personalArea'><FormattedMessage id='personal_data' /></StyledNavLink>
                                {shop &&
                                    <>
                                        <StyledNavLink show="pl-4" to='/myshop'><FormattedMessage id='shop_settings' /></StyledNavLink>
                                        <StyledNavLink show="pl-8" to='/myshop/products'><FormattedMessage id='my_works' /></StyledNavLink>
                                    </>
                                }
                                {!shop &&
                                    <StyledNavLink show="pl-4" to='/create_myshop'><FormattedMessage id='create_shop' /></StyledNavLink>
                                }
                                <StyledNavLink onClick={handleLogout} show="pl-4" to="/logout"><FormattedMessage id='logout' /></StyledNavLink>

                                {/* <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    type='submit'
                                    className={classNames(
                                        active
                                            ? "bg-blue-100/40"
                                            : "text-gray-700",
                                        "block w-full text-left px-4 py-2.5 text-sm"
                                    )}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item> */}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            }</>
    );
};

export default NavBarDropdown;
