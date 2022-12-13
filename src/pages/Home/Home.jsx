import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Tag from "../../components/Tag/Tag";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";

import Slider from "react-slick";
import ScrollContainer from 'react-indiana-drag-scroll'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, PlayIcon, PopularIcon, StarIcon } from "../../assets/icons";

const cx = classNames.bind(styles);

function Home({ apiMain, dataFilm }) {
	useEffect(() => {
		document.documentElement.scrollTop = 0;
	}, []);

	let trendFilm = apiMain[0].trendId
	let dataTrendFilm = dataFilm.filter(e => {
		return trendFilm.includes(e.movie._id)
	});

	let filmTheaters = apiMain[0].filmTheaters
	let dataFilmTheaters = dataFilm.filter(film => {
		let index = filmTheaters.map(e => e.id).indexOf(film.movie._id)
		if (index !== -1) {
			film.movie.rating = filmTheaters[index].rating
			return film
		}
	});
	dataFilmTheaters.sort((a, b) => {
		a = new Number(a.movie.rating)
		b = new Number(b.movie.rating)

		return a > b ? -1 : a < b ? 1 : 0
	})

	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 5000,
		variableWidth: true,
	};

	return (
		<div className={cx("wrapper")}>
			<div className={cx('line')}></div>
			<div className={cx('heading')}>Phim thịnh hành</div>
			<Slider {...settings}>
				{dataTrendFilm.map((e, i) => {
					return (
						<div key={i} className={cx('trend-film')}>
							<div className={cx('rating')}>
								<p>Top thịnh hành</p>
								<PopularIcon />
							</div>
							<div className={cx('bg-img')}>
								<img src={e.movie.poster_url} alt="" />
								<img src={e.movie.poster_url} alt="" className={cx('img-blur')} />
								<div className={cx('overlay')}></div>
							</div>
							<div className={cx('infor-control')}>
								<div>
									<p className={cx('name')}>{e.movie.name}</p>
									<p className={cx('origin-name')}>{e.movie.origin_name}</p>
									<Tag status={e.movie.episode_current} />
								</div>
								<Link className={cx('btn')} to={`${e.movie.slug}?id=${e.movie._id}`}>
									Xem phim
								</Link>
							</div>
						</div>
					)
				})}
			</Slider>

			<div style={{ marginBottom: '60px' }}></div>
			<p className={cx('heading')}>Phim chiếu rạp hay nhấp</p>
			<ScrollContainer className={cx('scroll-container')}>
				{dataFilmTheaters.map((e, i) => {
					return (
						<div key={i}>
							<motion.div
								whileHover={{ backgroundSize: '110%' }}
								className={cx('film')}
								transition={{
									duration: 0.5,
									type: "tween",
								}}
								style={{ background: `url(${e.movie.thumb_url}) center center /100%` }}
							>
								<div className={cx('overlay')}>
									<div className={cx('name-film')}>{e.movie.name}</div>
									<div className={cx('year-film')}>{e.movie.year}</div>
									<Link className={cx('play-btn')} to={`${e.movie.slug}?id=${e.movie._id}`}>
										<PlayIcon />
										<p>Xem ngay</p>
									</Link>
								</div>
								<div className={cx('score')}>
									<StarIcon className={cx('star-icon')} />
									<p>{e.movie.rating}</p>
								</div>
							</motion.div>
						</div>
					)
				})}
			</ScrollContainer>

			<div style={{ marginBottom: '60px' }}></div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "8px",
				}}
			>
				<p className={cx("heading-all")}>Tất cả phim</p>
				<Link to={"/toan-bo-phim"} className={cx("see-all")}>
					Xem tất cả
					<ChevronRightIcon />
				</Link>
			</div>
			<ScrollContainer className={cx('scroll-container')}>
				{dataFilm.slice(0, 6).map((e, i) => {
					return (
						<div key={i}>
							<motion.div
								whileHover={{ backgroundSize: '110%' }}
								transition={{
									duration: 0.5,
									type: "tween",
								}}
								className={cx('film')}
								style={{ background: `url(${e.movie.thumb_url}) center center /100%` }}
							>
								<div className={cx('overlay')}>
									<div className={cx('name-film')}>{e.movie.name}</div>
									<div className={cx('year-film')}>{e.movie.year}</div>
									<Link className={cx('play-btn')} to={`${e.movie.slug}?id=${e.movie._id}`}>
										<PlayIcon />
										<p>Xem ngay</p>
									</Link>
								</div>
							</motion.div>
						</div>
					)
				})}
				<div>
					<Link to={'/toan-bo-phim'} className={cx('film', 'all')}>
						View all...
					</Link>
				</div>
			</ScrollContainer>

			<Footer />
		</div>
	);
}

export default Home;
