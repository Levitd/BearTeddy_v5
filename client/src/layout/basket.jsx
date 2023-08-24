import React from "react";
import Page from "../components/page";
import BasketList from "../components/ui/basketList";

const Basket = () => {
    return (
        <Page backArrow={true} title={"shopping_basket"}>
            <BasketList/>
        </Page>
    );
};

export default Basket;
