import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { images } from "../../assets/images";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, MenuIcon } from "../../assets/icons";
import MenuDrop from "../MenuDrop/MenuDrop";
import { useState } from "react";

const cx = classNames.bind(styles);
function Navbar() {
    // const ITEMS_TL = [
    //     {
    //         to: "/hai-huoc",
    //         title: "Hài hước",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Cổ trang",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Chiến tranh",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Viễn tưởng",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Kinh dị",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Tài liệu",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Bí mật",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Phim 18+",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Tình cảm",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Tâm lý",
    //     },
    //     {
    //         to: "/hanh-dong",
    //         title: "Thể thao",
    //     },
    //     {
    //         to: "",
    //         title: "Phiêu lưu",
    //     },
    //     {
    //         to: "",
    //         title: "Âm nhạc",
    //     },
    //     {
    //         to: "",
    //         title: "Gia đình",
    //     },
    //     {
    //         to: "",
    //         title: "Học đường",
    //     },
    //     {
    //         to: "",
    //         title: "Hài hước",
    //     },
    //     {
    //         to: "",
    //         title: "Hình sự",
    //     },
    //     {
    //         to: "",
    //         title: "Võ thuật",
    //     },
    //     {
    //         to: "",
    //         title: "Khoa học",
    //     },
    //     {
    //         to: "",
    //         title: "Thần thoại",
    //     },
    //     {
    //         to: "",
    //         title: "Chính kịch",
    //     },
    //     {
    //         to: "",
    //         title: "Kinh điển",
    //     },
    // ];
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const [overlayBlur, setOverlayBlur] = useState(false);
    window.onscroll = () => {
        if (!overlayBlur && document.documentElement.scrollTop >= 24)
            setOverlayBlur(true);
        else if (overlayBlur && document.documentElement.scrollTop == 0)
            setOverlayBlur(false);
    };

    return (
        <>
            <div className={cx("wrapper")}>
                <Link to={"/"} className={cx("logo")}>
                    <img src={images.logo} />
                    <p className={cx("brand")}>Cinema</p>
                </Link>
                <div className={cx("nav-mobile")}>
                    <div
                        onClick={() => {
                            setOpenMenuMobile(true);
                        }}
                    >
                        <MenuIcon className={cx("menu-icon")} />
                    </div>
                    <div
                        className={cx("box-nav-mobile", {
                            show: openMenuMobile,
                        })}
                    >
                        <div
                            className={cx("exit")}
                            onClick={() => {
                                setOpenMenuMobile(false);
                            }}
                        >
                            ✖
                        </div>
                        <div className={cx("nav-mobile-item")}>
                            <Link to={"/phim-bo"} className={cx("item")}>
                                Phim bộ
                            </Link>
                        </div>
                        <div className={cx("nav-mobile-item")}>
                            <Link to={"/phim-le"} className={cx("item")}>
                                Phim lẻ
                            </Link>
                        </div>
                        <div className={cx("nav-mobile-item")}>
                            <Link to={"/tv-show"} className={cx("item")}>
                                TV show
                            </Link>
                        </div>
                        <div className={cx("nav-mobile-item")}>
                            <Link to={"/hoat-hinh"} className={cx("item")}>
                                Hoạt hình
                            </Link>
                        </div>
                        <div className={cx("nav-mobile-item")}>
                            <Link to={"/phim-sap-chieu"} className={cx("item")}>
                                Sắp chiếu
                            </Link>
                        </div>
                    </div>
                    <div
                        className={cx("overlay", { show: openMenuMobile })}
                        onClick={() => {
                            setOpenMenuMobile(false);
                        }}
                    ></div>
                </div>
                <div className={cx("nav")}>
                    <div className={cx("nav-item")}>
                        <NavLink to={"/phim-bo"} className={({isActive}) => cx("item", {active: isActive})}>
                            Phim bộ
                        </NavLink>
                    </div>
                    <div className={cx("nav-item")}>
                        <NavLink to={"/phim-le"} className={({isActive}) => cx("item", {active: isActive})}>
                            Phim lẻ
                        </NavLink>
                    </div>
                    <div className={cx("nav-item")}>
                        <NavLink to={"/tv-shows"} className={({isActive}) => cx("item", {active: isActive})}>
                            Show
                        </NavLink>
                    </div>
                    <div className={cx("nav-item")}>
                        <NavLink to={"/hoat-hinh"} className={({isActive}) => cx("item", {active: isActive})}>
                            Hoạt hình
                        </NavLink>
                    </div>
                    {/* <div className={cx("nav-item")}>
                        <MenuDrop items={ITEMS_TL}>
                            <div className={({isActive}) => cx("item", {active: isActive})}>
                                Thể loại{" "}
                                <ChevronDownIcon className={cx("icon-more")} />
                            </div>
                        </MenuDrop>
                        <div className={cx("bridge")}></div>
                    </div> */}
                    <div className={cx("nav-item")}>
                        <NavLink to={"/sap-chieu"} className={({isActive}) => cx("item", {active: isActive})}>
                            Sắp chiếu
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={cx("overlay-blur", { active: overlayBlur })}></div>
        </>
    );
}

export default Navbar;
