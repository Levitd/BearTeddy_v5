import React from "react";
import { useIntl } from "react-intl";
import ListBoxFilter from "../components/ListBoxFilter";
import Page from "../components/page";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import InputSearch from "../components/inputSearch";
import ProductList from "../components/ui/productList";
import ViewedList from "../components/ui/viewedList";
import listFilter from "../mockData/listFilter";
import {titleProductPage} from "../utils/util";

const MainPage = ({ locale }) => {
    const intl = useIntl();
    const placeholder = intl.messages.search;

    // Убрал пока listSize, в товарах еще нет размеров
    const {listBay,listPrice} = listFilter();
    const titlePage= titleProductPage();

    const filterStyle = "w-full lg:max-w-xs";
    return (
        <>
            <div className="mb-20 lg:mb-0" >
                <Page border=" rounded border-0 shadow-none lg:border-2 lg:shadow-md" pageMargin={""}>
                    <div className="main">
                        <div className="flex flex-col lg:flex-row">
                            <InputSearch name="search" placeholder={placeholder} />
                            <div className="filters pe-2 py-2 hidden lg:flex flex-col lg:flex-row w-11/12 lg:w-full mx-auto justify-around flex-wrap sm:flex-nowrap flex-auto gap-2 place-content-stretch">
                                <div className={filterStyle}>
                                    <ListBoxFilter name="listBay" list={listBay} locale={locale} />
                                </div>
                                {/*<div className={filterStyle}>*/}
                                {/*    <ListBoxFilter name="listSize" list={listSize} locale={locale} />*/}
                                {/*</div>*/}
                                <div className={filterStyle}>
                                    <ListBoxFilter name="listPrice" list={listPrice} locale={locale} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
                <ProductList list="all" title={titlePage} noTranslate={true} />
                <ViewedList title={"recently_viewed"} />
            </div>
        </>
    );
};

export default MainPage;
