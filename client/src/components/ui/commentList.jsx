import React, { useEffect, useState } from "react";
import Page from "../page";
import { useDispatch, useSelector } from "react-redux";
import { getComment, getCommentIsLoading, getCommentsUsers, loadCommentByProduct } from "../../store/comment";
import ImgFileld from "../common/form/img";
import { getCurrentUser } from "../../store/users";

const CommentList = ({ title, addStyle, product_id }) => {
    const commentList = useSelector(getComment());
    //Имеем массив объектом с Id_user коментариев к товару, нам нужен просто массив для передачи в запрос

    const dispatch = useDispatch();

    const loadingComment = useSelector(getCommentIsLoading());
    const [loadedData, setloadedData] = useState(loadingComment);
    const curentUser = useSelector(getCurrentUser());
    let usersCommentsList = useSelector(getCommentsUsers());

    useEffect(() => {
        if (!loadingComment) {
            dispatch(loadCommentByProduct(product_id));
        }

        setloadedData(loadingComment)
    }, [loadedData])

    if (usersCommentsList && usersCommentsList && curentUser && curentUser.length > 0) {
        usersCommentsList = [...usersCommentsList, curentUser[0]]
    } else if (!usersCommentsList && curentUser && curentUser.length > 0) {
        usersCommentsList = curentUser[0];
    }

    if (commentList && commentList.length > 0 && usersCommentsList && usersCommentsList.length > 0) {
        const commentListNew = commentList.map((comm) => {
            return { ...comm,
                user: usersCommentsList.find((user) => user._id === comm.user_id)
            }
        })
        return (
            <Page title={title} addStyle={addStyle} widthScreen="flex flex-col flex-wrap gap-5 my-2" pageMargin="">
                {
                    commentListNew.map((comm, idx) => {
                        // console.log(comm.user)
                        return (
                            <div key={"com_" + idx} className={"grid grid-cols-5 gap-2 lg:gap-3"}>
                                <ImgFileld
                                    path="imgProfilePathFirebaseStorige"
                                    file={`${(comm && comm.user && ("user" in comm) && ("image" in comm.user) && comm.user.image.length === 0) ? "no-image-icon.png" : comm.user.image[0].name}`}
                                    token={comm.user.image.length === 0 ? "f7499845-a9dc-49f5-80ff-bb444a933d15" : comm.user.image[0].token}
                                    addClass="w-16 h-auto mx-left mb-2 rounded-md place-self-center" />
                                <p className={"bg-slate-200 col-span-4 rounded-md p-1 text-base text-gray-800"}>
                                    {comm.comment}
                                </p>
                            </div>
                        )
                    })
                }
            </Page>
        )
    } else {
        return (
            <>
                {<Page title={"no_comments_be_the_first"} />}
            </>
        )
    }
}

export default CommentList;
