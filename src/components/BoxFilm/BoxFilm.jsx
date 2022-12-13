import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import styles from "./BoxFilm.module.scss";

const cx = classNames.bind(styles);

function BoxFilm({ dataFilm }) {
    const parse = require('html-react-parser');
    return (
        <div className={cx("box-film")}>
            {dataFilm.map((film, index) => {
                return (
                    <Link
                        to={`${film.movie.slug}?id=${film.movie._id}`}
                        key={index}
                        className={cx("film-item")}
                    >
                        <img src={film.movie.thumb_url} alt=''/>
                        <div className={cx("control-infor")}>
                            <div className={cx("name-film")}>
                                {film.movie.name}
                            </div>
                            <div className={cx("category")}>
                                {film.movie.category.map((e, i) => {
                                    if (i === film.movie.category.length - 1)
                                        return e.name;
                                    else return `${e.name} | `;
                                })}
                            </div>
                            <div className={cx("content")}>
                                {parse(film.movie.content)}   
                            </div>
                            <Tag
                                status={film.movie.episode_current}
                                sub={film.movie.sub_docquyen}
                            />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default BoxFilm;
