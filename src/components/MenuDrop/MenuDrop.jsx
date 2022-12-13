import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import styles from "./MenuDrop.module.scss";
const cx = classNames.bind(styles);

function MenuDrop({ items, children }) {

    function renderItems() {
        return items.map((item, index) => {
            let Tag = "div";

            let attrs = {
                key: index,
                onClick: item.onClick,
            };

            if (item.to) {
                Tag = Link;
                attrs.to = item.to;
            } else if (item.href) {
                Tag = "a";
                attrs.href = item.href;
            }

            return (
                <Tag {...attrs}>
                    <div
                        className={cx("menu-item")}
                    >
                        <div style={{display: 'flex'}}>
                            {item.icon}
                            <p className={cx("menu-title")}>{item.title}</p>
                        </div>
                    </div>
                </Tag>
            );
        });
    }

    return (
        <div>
            <HeadlessTippy
                trigger="mouseenter focus"
                interactive
                render={(attrs) => (
                    <div className={cx("menu-drop")} tabIndex="-1" {...attrs}>
                        <div className={cx("propper")}>
                            <div className={cx("wrapper")}>
                                {renderItems()}
                            </div>
                        </div>
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default MenuDrop
