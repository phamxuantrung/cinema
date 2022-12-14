import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FilterIcon, SearchIcon } from "../../assets/icons";
import BoxFilm from "../../components/BoxFilm/BoxFilm";
import Breadcump from "../../components/Breadcump/Breadcump";
import Paging from "../../components/Paging/Paging";
import styles from "../pagebox.module.scss";

const cx = classNames.bind(styles);

function All({ dataFilm }) {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

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
        navigate('/toan-bo-phim')
        setData(
            dataFilter.filter((e) => {
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

    // filter
    const [openBoxFilter, setOpenBoxFilter] = useState(false);
    const [dataFilter, setDataFilter] = useState(dataFilm);
    const type = useRef();
    const category = useRef();
    const country = useRef();
    const year = useRef();
    function handleFiter() {
        let wasFiter = dataFilm;
        if (type.current.value !== "to??n b??? phim") {
            wasFiter = wasFiter.filter((e) => {
                return type.current.value === e.movie.type;
            });
        }
        if (category.current.value !== "to??n b??? th??? lo???i") {
            wasFiter = wasFiter.filter((e) => {
                return e.movie.category.find((e) => {
                    return e.name === category.current.value;
                });
            });
        }
        if (country.current.value !== "to??n b??? qu???c gia") {
            wasFiter = wasFiter.filter((e) => {
                return e.movie.country.find((e) => {
                    return e.name === country.current.value;
                });
            });
        }
        if (year.current.value !== "to??n b??? n??m") {
            wasFiter = wasFiter.filter((e) => {
                return Number(year.current.value) === e.movie.year;
            });
        }
        setData(wasFiter);
        setDataFilter(wasFiter);

        refInput.current.value = "";
    }

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
                <div
                    className={cx("filter")}
                    onClick={() => {
                        setOpenBoxFilter(!openBoxFilter);
                    }}
                >
                    <FilterIcon className={cx("icon-filter")} />
                </div>
            </div>
            <div className={cx("box-filter", { active: openBoxFilter })}>
                <select ref={type}>
                    <option value="to??n b??? phim">To??n b??? phim</option>
                    <option value="series">Phim b???</option>
                    <option value="single">Phim l???</option>
                    <option value="tvshows">Tv-Shows</option>
                    <option value="hoathinh">Ho???t h??nh</option>
                </select>
                <select ref={category}>
                    <option value="to??n b??? th??? lo???i">To??n b??? th??? lo???i</option>
                    <option value="H??nh ?????ng">H??nh ?????ng</option>
                    <option value="T??nh C???m">T??nh c???m</option>
                    <option value="H??i H?????c">H??i h?????c</option>
                    <option value="C??? Trang">C??? trang</option>
                    <option value="T??m L??">T??m l??</option>
                    <option value="H??nh S???">H??nh s???</option>
                    <option value="Chi???n Tranh">Chi???n tranh</option>
                    <option value="Th??? Thao">Th??? thao</option>
                    <option value="V?? Thu???t">V?? thu???t</option>
                    <option value="Vi???n T?????ng">Vi???n t?????ng</option>
                    <option value="Phi??u L??u">Phi??u l??u</option>
                    <option value="Khoa H???c">Khoa h???c</option>
                    <option value="Kinh D???">Kinh d???</option>
                    <option value="??m Nh???c">??m nh???c</option>
                    <option value="Th???n Tho???i">Th???n tho???i</option>
                    <option value="T??i Li???u">T??i li???u</option>
                    <option value="Gia ????nh">Gia ????nh</option>
                    <option value="Ch??nh k???ch">Ch??nh k???ch</option>
                    <option value="B?? ???n">B?? ???n</option>
                    <option value="H???c ???????ng">H???c ???????ng</option>
                    <option value="Kinh ??i???n">Kinh ??i???n</option>
                    <option value="Phim 18+">Phim 18+</option>
                </select>{" "}
                <select ref={country}>
                    <option value="to??n b??? qu???c gia">To??n b??? qu???c gia</option>
                    <option value="Trung Qu???c">Trung Qu???c</option>
                    <option value="H??n Qu???c">H??n Qu???c</option>
                    <option value="Nh???t B???n">Nh???t B???n</option>
                    <option value="Th??i Lan">Th??i Lan</option>
                    <option value="??u M???">??u M???</option>
                    <option value="????i Loan">????i Loan</option>
                    <option value="H???ng K??ng">H???ng K??ng</option>
                    <option value="???n ?????">???n ?????</option>
                    <option value="Anh">Anh</option>
                    <option value="Ph??p">Ph??p</option>
                    <option value="Canada">Canada</option>
                    <option value="Qu???c Gia Kh??c">Qu???c Gia Kh??c</option>
                    <option value="?????c">?????c</option>
                    <option value="T??y Ban Nha">T??y Ban Nha</option>
                    <option value="Th??? Nh?? K???">Th??? Nh?? K???</option>
                    <option value="H?? Lan">H?? Lan</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Nga">Nga</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Ba Lan">Ba Lan</option>
                    <option value="Th???y ??i???n">Th???y ??i???n</option>
                    <option value="??c">??c</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Bzazil">Bzazil</option>
                    <option value="Philippines">Philippines</option>
                    <option value="B??? ????o Nha">B??? ????o Nha</option>
                    <option value="??">??</option>
                    <option value="??an M???ch">??an M???ch</option>
                    <option value="UAE">UAE</option>
                    <option value="Na Uy">Na Uy</option>
                    <option value="Th???y S??">Th???y S??</option>
                    <option value="Ch??u Phi">Ch??u Phi</option>
                    <option value="Nam Phi">Nam Phi</option>
                    <option value="Ukraina">Ukraina</option>
                    <option value="??? R???p X?? ??t">??? R???p X?? ??t</option>
                </select>{" "}
                <select ref={year}>
                    <option value="to??n b??? n??m">To??n b??? n??m</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                </select>
                <Link to={'/toan-bo-phim'} className={cx("btn-browser")} onClick={handleFiter}>
                    Duy???t phim
                </Link>
            </div>
            {searching && refInput.current.value.trim() !== "" && (
                <div className={cx("noti-search")}>
                    K???t qu??? t??m ki???m:
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
                        urlAdjacent={"toan-bo-phim"}
                    />
                </div>
            )}
        </div>
    );
}

export default All;