import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";
import styles from "./Paging.module.scss";

const cx = classNames.bind(styles);

function Paging({ number, numberCurrent, totalPage, urlAdjacent = null }) {
    let groupNumber;

    if (number.length === 1) groupNumber = [];
    else if (number.length === 2) groupNumber = [1, 2];
    else {
        if (numberCurrent > 1 && numberCurrent < totalPage)
            groupNumber = number.slice(numberCurrent - 2, numberCurrent + 1);
        else if (numberCurrent === 1) groupNumber = [1, 2, 3];
        else if (numberCurrent === totalPage)
            groupNumber = number.slice(totalPage - 3, totalPage);
    }

    return (
        <div className={cx("paging")}>
            <Link
                to={urlAdjacent ? `/${urlAdjacent}/trang-1` : '/trang-1'}
                className={cx("number", "min-number", {
                    show: numberCurrent > 1,
                })}
            >
                <ChevronLeftIcon />
            </Link>
            {groupNumber.map((i) => {
                return (
                    <Link
                        to={urlAdjacent ? `/${urlAdjacent}/trang-${i}` : `/trang-${i}`}
                        key={i}
                        className={cx("number", {
                            active: numberCurrent === i,
                        })}
                    >
                        {i}
                    </Link>
                );
            })}
            <Link
                to={urlAdjacent ? `/${urlAdjacent}/trang-${totalPage}` : `/trang-${totalPage}`}
                className={cx("number", "max-number", {
                    show: numberCurrent < totalPage,
                })}
            >
                <ChevronRightIcon />
            </Link>
        </div>
    );
}

export default Paging;
