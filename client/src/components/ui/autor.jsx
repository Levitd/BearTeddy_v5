import React from "react";
import {NavLink} from "react-router-dom";
// import ImgFileld from "../common/form/img";
import Title from "../title";
import configFile from "../../config.json";
import StyledNavLink from "../StyledNavLink";
import Message from "../message";

const Autor =({data, addStyle=""})=>{
    const telegramm = data.socialMedia.filter((sm)=>sm.name==="telegramm");
    const telegrammLink=(telegramm && telegramm.length>0) ? telegramm[0].link : null;
    const firebaseStorigeUrl = configFile.imgProfilePathFirebaseStorige;
    const background = `'${firebaseStorigeUrl}${(data.image.length > 0) ? data.image[0].name : "no-image-icon.png"}?alt=media&token=${data.image.length > 0 ? data.image[0].token : "f7499845-a9dc-49f5-80ff-bb444a933d15"}'`;
    return (
        <>
            <Title addStyleTitle={" mx-auto rounded-md w-full sm:w-[350px]"+addStyle}
                  pageMargin="">
                <div key={"au_" + data._id} className="w-full h-32 sm:h-36 mx-auto">
                    <div className="grid grid-cols-3 min-h-[150px] w-full">
                        <NavLink key={'profile_link_'+data._id}  to={"/profile/" + data.user_id} >
                            <div key={'profile_image_'+data._id} className={"bg-cover bg-center inline-block w-full h-full rounded-r-full"}
                                 style={{backgroundImage: `url(${background})` }}
                            >

                            </div>
                            {/*<ImgFileld path="imgProfilePathFirebaseStorige"*/}
                            {/*           file={`${(data.image.length > 0) ? data.image[0].name : "no-image-icon.png"}`}*/}
                            {/*           token={data.image.length > 0 ? data.image[0].token : "f7499845-a9dc-49f5-80ff-bb444a933d15"}*/}
                            {/*           addClass="inline-block w-32 sm:w-36 rounded-s-md rounded-e-full h-auto"/>*/}
                        </NavLink>
                        <div className="px-2 rounded-e-md border-2 shadow-inner col-span-2 bg-slate-200">
                            <Title>
                                {data.flName}
                            </Title>
                            {telegrammLink &&
                                <div className="flex flex-row flex-nowrap">
                                    <img
                                        src={configFile.imgPathFirebaseStorige + `icons8-telegram.svg?alt=media&token=dd78c2f0-e511-4113-a26c-1157e7c1fcff`}
                                        className='self-center inline-block h-4 sm:h-6 rounded-t-md w-auto border-2 shadow-inner'
                                        alt={`Telegramm`}
                                    />
                                    <StyledNavLink to={telegrammLink} target="_blanck">Telegramm</StyledNavLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Title addStyleTitle={"w-full"}>
                    {data.name}
                </Title>
                <div key={"sh_" + data._id} className="h-32 sm:h-36 mx-auto">
                    <div className="flex flex-col w-full">
                        <Message message={"about_shop"} color={"blue"}  messageAdd={": "+data.aboutShop} colorAdd={"text-blue-500"}/>
                    </div>
                </div>
            </Title>
    </>);
}

export default Autor;
