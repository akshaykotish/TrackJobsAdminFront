import NavBar from '../../components/NavBar/Navbar'; 
import './Department.css';
import Logo from '../../assets/images/ui_related/minilogo.png';
import React, { useState } from 'react';
import AddDepartment from './AddDepartment';
import Department from './Department';
import Illustration from '../../assets/images/ui_related/railwaysIllustration.jpg';


const Departments = ()=>{

    const[T_Name, updateT_Name] = useState("");
    const[T_Logo, updateT_Logo] = useState("");
    const[T_Illu, updateT_Illu] = useState("");
    const[All_Departments_List, All_Departments_ListFun] = useState([]);
    const[Search_Departments_List, Search_Departments_ListFun] = useState([]);
    const[show, updateShow] = useState("hidden");
    const[isitsearch, updateisitsearch] = useState(false);
   

    var searchvalueis = "";

      function OnSave(){
        ALL_Departments();
      }

    function HandleModel(t_name, t_logo, t_illu){

        updateT_Name(t_name);
        updateT_Logo(t_logo);
        updateT_Illu(t_illu);
        console.log(t_name, t_logo, t_illu);
        ShowHideModel();
    }

    function ShowHideModel(){
        console.log(show);
        updateShow(()=>"hidden");
        setTimeout(()=>{
            updateShow(()=>"visible");
        }, 300);
    }

    function ALL_Departments(){
       var All_Departments_List_temp = [];
        if(isitsearch == false){
            var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Departments", true); 
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    

                        for(var i=0; i<response.length; i++)
                            {   
                                var dept = response[i];
                                All_Departments_List_temp.push(
                                    <>
                                        <div className="MarginBox">
                                        <Department key={"Department" + i} Name={dept["Name"]} iLogo={dept["Logo"]} Illustrator={dept["Illustrator"]} ForShowing={HandleModel} />
                                        </div>
                                    </>
                                );
                            }
                            
                            All_Departments_ListFun(All_Departments_List_temp);
                        return All_Departments_List;
                }
                };
                
                xhttp.send();

        }
    }


    function Search_Departments(tosearch)
    {
        var Search_Departments_List_temp = [];

        searchvalueis = document.getElementById("searchbar").value;
        if(searchvalueis == "")
        {
            updateisitsearch(()=>false);
        }
        else{
            updateisitsearch(()=>true);
        }

        if(isitsearch == true){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Department/Search/" + searchvalueis, true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            

                for(var i=0; i<response.length; i++)
                    {   
                        var dept = response[i];
                        Search_Departments_List_temp.push(
                            <>
                                <div className="MarginBox">
                                <Department key={"Department" + i} Name={dept["Name"]} iLogo={dept["Logo"]} Illustrator={dept["Illustrator"]} ForShowing={HandleModel} />
                                </div>
                            </>
                        );
                    }
                    
                    Search_Departments_ListFun(Search_Departments_List_temp);
                return Search_Departments_List;
        }
        };
        
        xhttp.send();
        }
    }
    

    return (
        <>
        <div onLoad={ALL_Departments} className="MainBox">
            <div className="NavBox">
                <NavBar active="departments" />
            </div> 
            <div className="HomeBox">
                <div className="itsrow"><button onClick={ShowHideModel}>add department</button><div className="MarginBox">  </div><div><input id="searchbar" type="text" className="searchbox" placeholder="search department" onChange={Search_Departments}></input></div></div>
                    <AddDepartment show={show} depname={T_Name} logo={T_Logo} illustrator={T_Illu} onsave={OnSave} />
                    <br/><br/>
                <div className="All_Departments">               
                    {isitsearch == false ? All_Departments_List : Search_Departments_List}
                </div>  
            </div>
        </div>
        </>
    );
}

export default Departments;