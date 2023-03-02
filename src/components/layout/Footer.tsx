import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faYoutube,
  faTwitch,
  faDiscord,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footer_top}>
        <div className={style.customer_service}>
          <p>CUSTOMER SERVICE</p>
          <Link href="https://kb.newegg.com/">Help Center</Link>
          <Link href="https://secure.newegg.com/orders/find?Source=1">
            Track an Order
          </Link>
          <Link href="https://secure.newegg.com/orders/find?Source=2">
            Return an Item
          </Link>
          <Link href="https://www.newegg.com/promotions/nepro/22-0073/index.html?cm_sp=cs_menu-_-return_policy">
            Return Policy
          </Link>
          <Link href="https://kb.newegg.com/knowledge-base/privacy-policy-newegg/">
            Privacy & Security
          </Link>
          <Link href="#">Feedback</Link>
        </div>
        <div className={style.my_account}>
          <p>MY ACCOUNT</p>
          <Link href="#">Login / Register</Link>
          <Link href="#">Order History</Link>
          <Link href="#">Returns History</Link>
          <Link href="#">Address Book</Link>
          <Link href="#">Wish Lists</Link>
          <Link href="#">My Build Lists</Link>
          <Link href="#">My Build Showcase</Link>
          <Link href="#">Email Notifications</Link>
          <Link href="#">Subscription Orders</Link>
          <Link href="#">Auto Notifications</Link>
        </div>
        <div className={style.company_information}>
          <p>COMPANY INFORMATION</p>
          <Link href="#">About Newegg</Link>
          <Link href="#">Inverstor Relations</Link>
          <Link href="#">Awards/Rankings</Link>
          <Link href="#">Hours and Locations</Link>
          <Link href="#">Press Inquiries</Link>
          <Link href="#">Newegg Careers</Link>
          <Link href="#">Newsroom</Link>
          <Link href="#">Newegg Insider</Link>
          <Link href="#">Calif. Transparency in Supply Chains Act</Link>
          <Link href="#">Cigna MRF</Link>
        </div>
        <div className={style.tools_resources}>
          <p>TOOLS & RESOURCES</p>
          <Link href="#">Sell on Newegg</Link>
          <Link href="#">For Your Business</Link>
          <Link href="#">Newegg Partner Services</Link>
          <Link href="#">Become an Affiliate</Link>
          <Link href="#">Newegg Creators</Link>
          <Link href="#">Site Map</Link>
          <Link href="#">Shop by Brand</Link>
          <Link href="#">Rebates</Link>
          <Link href="#">Mobile Apps</Link>
        </div>
        <div className={style.shop_our_brand}>
          <p>SHOP OUR BRANDS</p>
          <Link href="#">Newegg Business</Link>
          <Link href="#">Newegg Global</Link>
          <Link href="#">ABS</Link>
          <Link href="#">Rosewill</Link>
        </div>
      </div>
      <div className={style.footer_bottom}>
        <div className={style.foot_bottom_left}>
          <p>© 2000-2023 Newegg Inc. All rights reserved.</p>
          <Link href="#">Terms & Conditions</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookie Preferences</Link>
        </div>
        <div className={style.foot_bottom_right}>
          <Link href="#">
            <FontAwesomeIcon icon={faFacebook} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faTwitter} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faInstagram} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faLinkedin} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faPinterest} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faYoutube} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faTwitch} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faDiscord} className={style.icons} />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faTiktok} className={style.icons} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
