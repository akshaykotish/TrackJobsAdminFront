import './Navbar.css';
import Logo from '../../assets/images/ui_related/minilogo.png';

const Navbar = ({active})=>{

    var nameis = "no name";
    let cokiees = document.cookie.split(";");

    for(var i=0; i<cokiees.length; i++)
    {
        if(cokiees[i].includes("name") == true)
        {
            nameis = cokiees[i].substring(6, cokiees[i].length > 18 ? 18 : cokiees[i].length );
        }
    }

    var withunderscor  = "NavBarMenuItem underscore";
    var withoutunderscor  = "NavBarMenuItem";
    
    if(active === "home" || active === "departments" || active === "jobs" || active === "users" || active === "profile" || active === "about" || active === "contact")
    {
        var ele = document.getElementById(active);
        if(ele != null){
            ele.classList.add("underscore");
        } 
    }

    return (
        <>
                <div className="NavBarBox">
                    <img width="100px" src={Logo}></img>
                    <br/>
                    <h3>{nameis}</h3>
                    <div id="home" className={active === "home" ? withunderscor : withoutunderscor}>
                        home
                    </div>
                    <div id="departments" onClick={()=>{window.location.replace("/Departments");}} className={active === "departments" ? withunderscor : withoutunderscor}>
                        departments
                    </div>
                    <div id="jobs" onClick={()=>{window.location.replace("/Jobs");}} className={active === "jobs" ? withunderscor : withoutunderscor}>
                        jobs
                    </div>
                    <div id="users" className={active === "users" ? withunderscor : withoutunderscor}>
                        users
                    </div>
                    <div id="profile" className={active === "profile" ? withunderscor : withoutunderscor}>
                        profile
                    </div>
                    <div id="about" className={active === "about" ? withunderscor : withoutunderscor}>
                        about
                    </div>
                    <div id="contact" className={active === "contact" ? withunderscor : withoutunderscor}>
                        contact
                    </div>
                    <div className="aakac">
                    <br/>
                    version 0.0.1<br/>
                        an <b>akshay kotish & co.</b> product
                    </div>
                </div>
              </>  
            );
}

export default Navbar;