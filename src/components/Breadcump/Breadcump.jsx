import classNames from "classnames/bind";
import styles from "./Breadcump.module.scss";

import { ChevronRightIcon, HomeIcon } from "../../assets/icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Breadcump({ url, slugFilm, nameFilm, transparent }) {
    function convertToUTF8(arr) {
        return arr.map((e) => {
            if (e === "toan-bo-phim") e = "toàn bộ phim";
            else if (e === "phim-le") e = "phim lẻ";
            else if (e === "phim-bo") e = "phim bộ";
            else if (e === "hoat-hinh") e = "hoạt hình";
            else if (e === "sap-chieu") e = "sắp chiếu";
            else if (e === slugFilm) e = nameFilm;

            e = e.split("-").join(" ");
            return e;
        });
    }
    let breadcump = url.split("/");
    let titleBreadcump = breadcump.slice(3, breadcump.length);
    titleBreadcump.forEach((e, i) => {
        if (e.includes("?id=")) {
            titleBreadcump[i] = titleBreadcump[i].slice(
                0,
                titleBreadcump[i].indexOf("?")
            );
        }
    });

    breadcump.splice(0, 3);
    breadcump.forEach((e, i) => {
        let temp = "";
        if (i !== 0 && i !== breadcump.length - 1) {
            for (let j = 0; j <= i; j++) {
                temp += `/${titleBreadcump[j]}`;
            }
            breadcump[i] = temp.replace("/", "");
        }
    });

    titleBreadcump = convertToUTF8(titleBreadcump);

    return (
        <div className={cx("wrapper", {transparent: transparent})}>
            <Link to={"/"} className={cx("home")}>
                <HomeIcon />
            </Link>
            <ChevronRightIcon className={cx("arrow-cump")} />
            {breadcump.map((e, i) => {
                return (
                    <div
                        key={i}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        {i !== breadcump.length - 1 ? (
                            <Link to={`/${e}`} className={cx("link-cump")}>
                                {titleBreadcump[i]}
                            </Link>
                        ) : (
                            <div className={cx("link-cump", "last-cump")}>
                                {titleBreadcump[i]}
                            </div>
                        )}
                        {i !== breadcump.length - 1 && (
                            <ChevronRightIcon className={cx("arrow-cump")} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Breadcump;
