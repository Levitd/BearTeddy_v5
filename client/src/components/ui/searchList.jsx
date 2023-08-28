import React from "react";
import Page from "../page";
import configFile from "../../config.json";
// import { FormattedRelativeTime } from "react-intl";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import {getFindProductList} from "../../store/products";
import {getGlobalFilter} from "../../store/filterList";

const SearchList = ({ title, addStyle }) => {
    const searchList = useSelector(getFindProductList());
    const {search} = useSelector(getGlobalFilter());

    // const viewed = [...viewed_];
    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
    if (searchList && searchList.length>0) {

        return (
            <Page title={title} addStyle={addStyle} widthScreen="flex flex-row flex-wrap gap-2 lg:gap-5 mb-2" pageMargin="">
                {
                    searchList.map((prod) => {
                        const background = `${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}`;
                        return (
                            <div key={"v_" + prod._id} className="w-32 sm:w-40 md:w-44 mx-auto">
                                <div key={"v1_" + prod._id} className="flex flex-col">
                                    <NavLink to={"/myshop/products/" + prod._id} key={"nl_" + prod._id}>

                                            {prod.image && prod.image.length > 0 &&
                                                <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="max-w-32 h-52 sm:w-40 sm:h-60 md:w-44 md:h-64 " key={"v3_" + prod._id}>
                                                    {/*<img className="inline-block w-full rounded-t-md h-auto border-2 shadow-inner" src={`${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}`} alt="" key={`activeProductImage_${prod.image[0].name}`} />*/}
                                                </div>
                                            }

                                        <div className="px-2 bg-slate-100  rounded-b-md border-2 shadow-inner" key={"v4_" + prod._id}>
                                            <div className="line-clamp-1 text-sm lg:text-base font-normal text-sky-800 text-center" key={"v5_" + prod._id}>{prod.name}</div>
                                            <div className="text-xs lg:text-sm font-light text-gray-600 " key={"v6_" + prod._id}>
                                                {/*<FormattedRelativeTime value={(prod.time_viewed - Date.now()) / 1000} numeric="auto" updateIntervalInSeconds={(Date.now() - prod.time_viewed) / 1000 > 60 ? 60 : 1} />*/}
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                    );
                    })
                }
            </Page>
        )
    }else {
        if (search) {
            return (
                <>
                    <Page title={"nothing_found_for_your_request"}></Page>
                </>
            );
        } else {
            return (<></>);
        }
    }
}

export default SearchList;
