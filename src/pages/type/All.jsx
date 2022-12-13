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
        if (type.current.value !== "toàn bộ phim") {
            wasFiter = wasFiter.filter((e) => {
                return type.current.value === e.movie.type;
            });
        }
        if (category.current.value !== "toàn bộ thể loại") {
            wasFiter = wasFiter.filter((e) => {
                return e.movie.category.find((e) => {
                    return e.name === category.current.value;
                });
            });
        }
        if (country.current.value !== "toàn bộ quốc gia") {
            wasFiter = wasFiter.filter((e) => {
                return e.movie.country.find((e) => {
                    return e.name === country.current.value;
                });
            });
        }
        if (year.current.value !== "toàn bộ năm") {
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
                    <option value="toàn bộ phim">Toàn bộ phim</option>
                    <option value="series">Phim bộ</option>
                    <option value="single">Phim lẻ</option>
                    <option value="tvshows">Tv-Shows</option>
                    <option value="hoathinh">Hoạt hình</option>
                </select>
                <select ref={category}>
                    <option value="toàn bộ thể loại">Toàn bộ thể loại</option>
                    <option value="Hành Động">Hành động</option>
                    <option value="Tình Cảm">Tình cảm</option>
                    <option value="Hài Hước">Hài hước</option>
                    <option value="Cổ Trang">Cổ trang</option>
                    <option value="Tâm Lý">Tâm lý</option>
                    <option value="Hình Sự">Hình sự</option>
                    <option value="Chiến Tranh">Chiến tranh</option>
                    <option value="Thể Thao">Thể thao</option>
                    <option value="Võ Thuật">Võ thuật</option>
                    <option value="Viễn Tưởng">Viễn tưởng</option>
                    <option value="Phiêu Lưu">Phiêu lưu</option>
                    <option value="Khoa Học">Khoa học</option>
                    <option value="Kinh Dị">Kinh dị</option>
                    <option value="Âm Nhạc">Âm nhạc</option>
                    <option value="Thần Thoại">Thần thoại</option>
                    <option value="Tài Liệu">Tài liệu</option>
                    <option value="Gia Đình">Gia đình</option>
                    <option value="Chính kịch">Chính kịch</option>
                    <option value="Bí ẩn">Bí ẩn</option>
                    <option value="Học Đường">Học đường</option>
                    <option value="Kinh Điển">Kinh điển</option>
                    <option value="Phim 18+">Phim 18+</option>
                </select>{" "}
                <select ref={country}>
                    <option value="toàn bộ quốc gia">Toàn bộ quốc gia</option>
                    <option value="Trung Quốc">Trung Quốc</option>
                    <option value="Hàn Quốc">Hàn Quốc</option>
                    <option value="Nhật Bản">Nhật Bản</option>
                    <option value="Thái Lan">Thái Lan</option>
                    <option value="Âu Mỹ">Âu Mỹ</option>
                    <option value="Đài Loan">Đài Loan</option>
                    <option value="Hồng Kông">Hồng Kông</option>
                    <option value="Ấn Độ">Ấn Độ</option>
                    <option value="Anh">Anh</option>
                    <option value="Pháp">Pháp</option>
                    <option value="Canada">Canada</option>
                    <option value="Quốc Gia Khác">Quốc Gia Khác</option>
                    <option value="Đức">Đức</option>
                    <option value="Tây Ban Nha">Tây Ban Nha</option>
                    <option value="Thổ Nhĩ Kỳ">Thổ Nhĩ Kỳ</option>
                    <option value="Hà Lan">Hà Lan</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Nga">Nga</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Ba Lan">Ba Lan</option>
                    <option value="Thụy Điển">Thụy Điển</option>
                    <option value="Úc">Úc</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Bzazil">Bzazil</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Bồ Đào Nha">Bồ Đào Nha</option>
                    <option value="Ý">Ý</option>
                    <option value="Đan Mạch">Đan Mạch</option>
                    <option value="UAE">UAE</option>
                    <option value="Na Uy">Na Uy</option>
                    <option value="Thụy Sĩ">Thụy Sĩ</option>
                    <option value="Châu Phi">Châu Phi</option>
                    <option value="Nam Phi">Nam Phi</option>
                    <option value="Ukraina">Ukraina</option>
                    <option value="Ả Rập Xê Út">Ả Rập Xê Út</option>
                </select>{" "}
                <select ref={year}>
                    <option value="toàn bộ năm">Toàn bộ năm</option>
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
                    Duyệt phim
                </Link>
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
                        urlAdjacent={"toan-bo-phim"}
                    />
                </div>
            )}
        </div>
    );
}

export default All;