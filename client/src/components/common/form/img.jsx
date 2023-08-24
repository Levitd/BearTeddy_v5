import React from "react";
import configFile from "../../../config.json";

const ImgFileld = ({ path, file, addClass, token }) => {
    return (
        <img src={configFile[path] + file + (token ? `?alt=media&token=${token}` : "")} alt="file" className={addClass} />
    );
}

export default ImgFileld;
