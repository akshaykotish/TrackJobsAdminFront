import React from 'react';
import NavBar from '../../components/NavBar/Navbar'; 
import './Job.css';
import Logo from '../../assets/images/ui_related/minilogo.png';

class Job extends React.Component{

    render(){

        return (
            <>
            <div className="JobBox" onClick={()=>{ window.open("/AddJob/" + this.props.JobID, '_blank').focus();}}>
            <div className="JobBoxLogo"><img src={Logo} width="40"></img></div>
            <div className="JobBoxData">
                <span className="JobBoxDataHeading">
                    {this.props.Title}
                </span>
                <br/>
                <span className="JobBoxDataSubHeading">
                {this.props.Department}
                </span>
                <br/>
                <span className="JobBoxDataSubHeading">
                {this.props.Location}
                </span>
            </div>
            </div>
            </>
        );
    }
    
}

export default Job;