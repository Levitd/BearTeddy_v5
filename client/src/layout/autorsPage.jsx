import React from "react";
import Page from "../components/page";
import AutorList from "../components/ui/autorList";

const AutorsPage = () => {
    return (
        <Page title={"autors"} addStyle={"mb-5"}>
            <AutorList/>
        </Page>
    );
};

export default AutorsPage;
