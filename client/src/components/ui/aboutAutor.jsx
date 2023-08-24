import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAutorOfProduct } from "../../store/activeProduct";
import SpinnerLader from "../SpinnerLoader";
import { getAutorActive, loadActiveAutor } from "../../store/activeAutor";
import {getShops} from "../../store/shops";
import Autor from "./autor";
import Page from "../page";

const AboutAutor = ({ title, addStyle }) => {
    const dispatch = useDispatch();
    const autorOfProduct = useSelector(getAutorOfProduct());
    useEffect(() => {
        if (autorOfProduct) {
            dispatch(loadActiveAutor(autorOfProduct));
        }
    }, [autorOfProduct, dispatch]);

    const autor = useSelector(getAutorActive());
    const shops = useSelector(getShops());
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (autor && shops) setLoad(true);
    }, [load, autor]);
    if (autor) {
        const shop = shops.find((s)=>s.user_id===autor._id);
        return (
            <Page title={title} addStyle={addStyle} pageMargin={""}>
                <Autor data={{...autor,...shop}} addStyle={" w-full max-w-none"}/>
            </Page>
        );
    } else {
        return (
            <>
            {<SpinnerLader/>}
            </>
    )
    }
}

export default AboutAutor;
