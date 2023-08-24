import React from "react";
import Page from "../components/page";
import CommentForm from "../components/ui/commentForm";
import CommentList from "../components/ui/commentList";
import {useParams} from "react-router-dom";

const Comments = ({ title, addStyle }) => {
    const {_id} = useParams();
    return (
        <Page title={title} addStyle={addStyle} pageMargin="">
            <CommentList product_id={_id}/>
            <div className={"my-2"}>
            <CommentForm product_id={_id}/>
            </div>
        </Page>
    );
}

export default Comments;
