import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
    const title = 'BestCars'

    return(
        <div className="footer">
                <div className="row">
                    <div className="footer-col-1">
                        <Link to='/' style={{textDecoration: 'none'}}>{title}</Link>
                        <p>Our main purpose is to sell the cheapeast and in the same time the most realiable cars</p>
                    </div>
                    <div className="footer-col-2">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Coupons</li>
                            <li>Return Policy</li>
                            <li>Join Affiliate</li>
                        </ul>
                    </div>
                    <div className="footer-col-3">
                        <h3>Follow us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Youtube</li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default Footer;