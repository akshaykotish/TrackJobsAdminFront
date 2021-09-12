import React from 'react';
import NavBar from '../../components/NavBar/Navbar'; 
import './Job.css';
import Job from './Job';
class Jobs extends React.Component{

    constructor(props)
    {
        super(props);

        this.state = {
            isitsearch: false,
            All_Jobs: [],
            Search_Jobs: [],
        }

        var itis =  this;
        function Load_All_Jobs(){
            var All_Jobs_List_temp = [];
            if(itis.state.isitsearch == false){
                var xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "http://localhost:4178/Jobs", true); 
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var response = JSON.parse(this.responseText);
                        
                            for(var i=0; i<response.length; i++)
                                {   
                                    var dept = response[i];
                                    All_Jobs_List_temp.push(
                                        <>
                                            <div>
                                                <Job Title={dept["Title"]} Department={dept["Department"]} Location={dept["Location"]} />
                                            </div>
                                        </>
                                    );
                                }
                                
                            itis.setState({
                                All_Jobs: All_Jobs_List_temp,
                            });

                            console.log(All_Jobs_List_temp);
                            return itis.state.All_Departments_List;
                    }
                    };
                    
                    xhttp.send();

            }
        }
        Load_All_Jobs();

    }

    componentDidUpdate(){
        
    }

    render(){
        var itis =  this;
        
        
    function Search_Departments(tosearch)
    {
        var Search_Jobs_List_temp = [];

        var searchvalueis = document.getElementById("searchbar").value;
        if(searchvalueis == "")
        {
            itis.setState({
                isitsearch: false,
            });
        }
        else{
            itis.setState({
                isitsearch: true,
            });
        }

        if(itis.state.isitsearch == true){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:4178/Jobs/Search/" + searchvalueis, true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            

                for(var i=0; i<response.length; i++)
                    {   
                        var dept = response[i];
                        Search_Jobs_List_temp.push(
                            <>
                            <div>
                                <Job Title={dept["Title"]} Department={dept["Department"]} Location={dept["Location"]} />
                            </div>
                        </>
                        );
                    }
                    
               
                    itis.setState({
                        Search_Jobs: Search_Jobs_List_temp,
                    });

                    return Search_Jobs_List_temp;
        }
        };
        
        xhttp.send();
        }
    }


    


        return (
        <>
        <div className="MainBox">
            <div className="NavBox">
                <NavBar active="jobs" />
            </div> 
            <div className="HomeBox">
                <div className="itsrow"><button onClick={()=>{ window.open("/AddJob", '_blank').focus();}}>add job</button><div className="MarginBox">  </div><div><input id="searchbar" type="text" className="searchbox" onChange={Search_Departments} placeholder="search jobs"></input></div></div>
                <br></br>
                <div className="AllJobs">
                    {this.state.isitsearch == false ? this.state.All_Jobs : this.state.Search_Jobs}
                </div>
            </div>
        </div>
        </>
        );
    }
    
}

export default Jobs;