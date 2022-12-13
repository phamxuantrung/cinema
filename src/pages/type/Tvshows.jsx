import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import BoxFilm from "../../components/BoxFilm/BoxFilm";
import Paging from "../../components/Paging/Paging";
import Breadcump from "../../components/Breadcump/Breadcump";
import styles from "../pagebox.module.scss";

const cx = classNames.bind(styles);

function Tvshows({ dataFilm }) {
    let pathPage = 'tv-shows'
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    dataFilm = dataFilm.filter((e) => {
        return e.movie.type === "tvshows";
    });

    let url = window.location.href;
    const [data, setData] = useState(dataFilm);

    // pagination
    let perPage;
    if (window.innerWidth > 1240) perPage = 24;
    else if (window.innerWidth < 860) perPage = 8;
    else perPage = 16;

    let numberCurrent =
        Number(url.slice(url.lastIndexOf("-") + 1, url.length)) || 1;
    let totalPage = Math.ceil(data.length / perPage);
    let number = [];
    for (let i = 1; i <= totalPage; i++) {
        number.push(i);
    }

    const [re, setRe] = useState(false);

    // search
    const refInput = useRef();
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    function handleSearch() {
        navigate(`/${pathPage}`)
        setData(
            dataFilm.filter((e) => {
                return (
                    e.movie.name
                        .toLowerCase()
                        .includes(refInput.current.value.toLowerCase()) ||
                    e.movie.origin_name
                        .toLowerCase()
                        .includes(refInput.current.value.toLowerCase())
                );
            })
        );
        setSearching(true);
    }
    window.onkeyup = function (e) {
        if (e.which === 13) {
            handleSearch();
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Breadcump url={url} transparent/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 6px 16px 6px",
                }}
            >
                <div className={cx("search")}>
                    <label>
                        <SearchIcon className={cx("icon-search")} />
                    </label>
                    <input type="search" ref={refInput} />
                </div>
            </div>
            {searching && refInput.current.value.trim() !== "" && (
                <div className={cx("noti-search")}>
                    Kết quả tìm kiếm:
                    <span> {refInput.current.value}</span>
                </div>
            )}
            <BoxFilm
                dataFilm={data.slice(
                    (numberCurrent - 1) * perPage,
                    numberCurrent * perPage
                )}
            />
            {data.length > 0 && (
                <div
                    onClick={() => {
                        setRe(!re);
                        document.documentElement.scrollTop = 0;
                    }}
                >
                    <Paging
                        number={number}
                        numberCurrent={numberCurrent}
                        totalPage={totalPage}
                        urlAdjacent={pathPage}
                    />
                </div>
            )}
        </div>
    );
}

export default Tvshows;