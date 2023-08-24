import React from "react";
import ProductList from "../components/ui/productList";

const MyProductsPage = ({ list }) => {
    return (
        <ProductList title="my_works" list={list} />
    );
}

export default MyProductsPage;
