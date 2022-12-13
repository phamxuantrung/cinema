import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import { images } from "../../assets/images";

const cx = classNames.bind(styles);

function Footer() {
    return ( 
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Copyright © 2022 All Rights Reserved by Cinema.</p>
            <div>
                <img src={images.fb} />
                <img src={images.ins} />
                <img src={images.youtube} />
                <img src={images.dribbble} />
            </div>
        </div>
     );
}

export default Footer;