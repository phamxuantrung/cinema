import classNames from "classnames/bind";
import styles from "./Tag.module.scss";

const cx = classNames.bind(styles);

function Tag({ status, sub }) {
    return (
        <div className={cx("wrapper")}>
            {status ? <div className={cx("status", "tag")}>{status}</div> : ""}
            {sub === "on" ? (
                <div className={cx("sub", "tag")}>Vietsub độc quyền</div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Tag;
