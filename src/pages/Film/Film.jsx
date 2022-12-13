import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import Tag from "../../components/Tag/Tag";
import styles from "./Film.module.scss";

import ReactPlayer from "react-player";
import Breadcump from "../../components/Breadcump/Breadcump";

const cx = classNames.bind(styles);

function Film({ dataFilm }) {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    const parse = require("html-react-parser");

    let url = window.location.href;

    let _id = url.slice(url.lastIndexOf("=") + 1, url.length);
    let film = dataFilm.find((film) => {
        return film.movie._id === _id;
    });

    const [data, setData] = useState("");

    return (
        <div className={cx("wrapper", { change: data })}>
            {window.innerWidth > 860 && <Breadcump url={url} slugFilm={film.movie.slug} nameFilm={film.movie.name} />}
            <div className={cx("box-film", { hidden: data })}>
                <div className={cx("img")}>
                    <img src={film.movie.thumb_url} alt="" />
                </div>
                <div className={cx("control-infor")}>
                    <div className={cx("infor")}>
                        <p className={cx("name-film")}>{film.movie.name}</p>
                        <p className={cx("origin-name-film")}>
                            {film.movie.origin_name}
                        </p>
                        <div className={cx("box-infor")}>
                            <div className={cx("infor-item")}>
                                <span>Trạng thái: </span>
                                <Tag status={film.movie.episode_current} />
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Số tập: </span>
                                {film.movie.episode_total}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Chất lượng: </span>
                                {film.movie.quality}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Ngôn ngữ: </span>
                                {film.movie.lang}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Đạo diễn: </span>
                                {film.movie.director.map((e, i) => {
                                    if (e === "") return "Đang cập nhật";
                                    if (i === film.movie.director.length - 1)
                                        return e;
                                    else return `${e}, `;
                                })}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Diễn viên: </span>
                                {film.movie.actor.map((e, i) => {
                                    if (e === "") return "Đang cập nhật";
                                    if (i === film.movie.actor.length - 1)
                                        return e;
                                    else return `${e}, `;
                                })}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Thể loại: </span>
                                {film.movie.category.map((e, i) => {
                                    if (i === film.movie.category.length - 1)
                                        return e.name;
                                    else return `${e.name} | `;
                                })}
                            </div>
                            <div className={cx("infor-item")}>
                                <span>Quốc gia: </span>
                                {film.movie.country.map((e, i) => {
                                    if (i === film.movie.country.length - 1)
                                        return e.name;
                                    else return `${e.name} | `;
                                })}
                            </div>
                        </div>
                        <div className={cx("content")}>
                            {parse(film.movie.content)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("video-control", { hidden: !data })}>
                <div className={cx("video")}>
                    <ReactPlayer
                        controls
                        playing
                        url={data}
                        className={cx("video-player")}
                    />
                </div>
                <div className={cx("infor-short")}>
                    <div className={cx("name-film-short")}>
                        {film.movie.name}
                    </div>
                    <div
                        className={cx("infor-item-short")}
                    >{`${film.movie.quality} • ${film.movie.lang}`}</div>
                </div>
            </div>
            {film.episodes.map((e, i) => {
                return (
                    <div key={i} className={cx("episodes")}>
                        <div className={cx("heading")}>{e.server_name}</div>
                        {e.server_data.length === 1 ? (
                            e.server_data[0].link_m3u8 === "" ? (
                                <div
                                    className={cx("episode", { active: data })}
                                    onClick={() => {
                                        setData(film.movie.trailer_url);
                                    }}
                                >
                                    Trailer
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setData(e.server_data[0].link_m3u8);
                                    }}
                                    className={cx("episode", {
                                        active:
                                            e.server_data[0].link_m3u8 === data,
                                    })}
                                >
                                    Full
                                </div>
                            )
                        ) : (
                            e.server_data.map((episode, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setData(episode.link_m3u8);
                                            document.documentElement.scrollTop = 0;
                                        }}
                                        key={index}
                                        className={cx("episode", {
                                            active: episode.link_m3u8 === data,
                                        })}
                                    >
                                        {episode.name}
                                    </div>
                                );
                            })
                        )}
                    </div>
                );
            })}
            <div
                className={cx("bg")}
                style={{ background: `url(${film.movie.poster_url})` }}
            ></div>
        </div>
    );
}

export default Film;
