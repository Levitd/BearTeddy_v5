import React from "react";
import { Tab } from "@headlessui/react";
import Flag from 'react-world-flags';
import { LOCALES } from "../../i18n/locales";

const NavBarSelectLang = ({ handleChange }) => {
    const languages = [
        { name: 'English', codeLang: LOCALES.ENGLISH, code: "GB" },
        { name: 'Русский', codeLang: LOCALES.RUSSIAN, code: "RU" }];

    const defaultLang = languages.findIndex((f) => {
        return f.codeLang === (JSON.parse(localStorage.getItem("locale")) || "en-US");
    });
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    };
    const baseClass = "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2";
    const selectClass = "bg-white shadow";
    const unSelectClass = "text-blue-100 hover:bg-white/[0.12] hover:text-white";
    return (
        <div className="w-full max-w-[4rem] min-w-[4rem] sm:max-w-[5rem] sm:mim-w-[5rem] px-2 py-0 sm:px-0">
            <Tab.Group defaultIndex={defaultLang}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {languages.map((l) => {
                        return (
                            <Tab key={`langRu${l.codeLang}`}
                                onClick={handleChange}
                                className={({ selected }) =>
                                    classNames(baseClass,
                                        selected
                                            ? selectClass
                                            : unSelectClass
                                    )
                                }
                            ><Flag code={l.code} height="48" data-value={l.codeLang} /></Tab>
                        )
                    })}
                </Tab.List>
            </Tab.Group>
        </div>
    )
}

export default NavBarSelectLang;
