import HeaderCSS from './Header.css'
import logo from '../../assets/images/ui_related/minilogo.png';

const Header = ()=>{
    return (
        <>
        <div className="Header">
            <img className="Logo" src={logo}></img>
            <div className="Menu">

            </div>
        </div>
        </>
    );
}

export default Header;