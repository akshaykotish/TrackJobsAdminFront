import NavBar from '../../components/NavBar/Navbar'; 
import "./Home.css";

const Home = ()=>{
    return (
        <>
        <div className="MainBox">
            <div className="NavBox">
                <NavBar active="home" />
            </div>
            <div className="HomeBox">
                
            </div>
        </div>
        </>
    );
}

export default Home;