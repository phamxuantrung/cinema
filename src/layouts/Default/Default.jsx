import classNames from "classnames/bind";
import styles from "./Default.module.scss"
import Navbar from "../../components/Navbar/Navbar.jsx"


const cx =  classNames.bind(styles)

function Default({children}) {
    return (
        <div className={cx('wrapper')}>
            <Navbar/>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default Default;