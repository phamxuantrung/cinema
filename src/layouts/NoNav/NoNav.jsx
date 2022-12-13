import classNames from "classnames/bind";
import styles from "./NoNav.module.scss"

const cx = classNames.bind(styles)

function NoNav({children}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>{children}</div>
        </div>
    );
}

export default NoNav;
