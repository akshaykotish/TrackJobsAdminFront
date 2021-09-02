import React from 'react';
import NavBar from '../../components/NavBar/Navbar'; 
import './Job.css';
import SearchDropDown from '../../components/SearchDropDown/SearchDropDown';

class AddJob extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            IsDataLoaded:false,
            Department:"",
            Title: "",
            Location:"",
            Vacancies:"",
            Salary:"",
            ApplyLink:"",
            How_To_Apply:"",
            searchedRslts: [],
            ShowAges: [],
            ShowQualification:[],
            ShowDates:[],
            Qualifications:[],
            Ages:[],
            Dates:[],
            Intrests:0,
            Applied:0,
            All_Departments: [],
        }

        var itis = this;
        if(itis.state.IsDataLoaded == false){
            console.log("Departments Loading");
            function Load_All_Departments(){
                
                var All_Departments_List_temp = [];
                    var xhttp = new XMLHttpRequest();
                        xhttp.open("GET", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Departments", true); 
                        xhttp.setRequestHeader("Content-Type", "application/json");
                        xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            var response = JSON.parse(this.responseText);
                            
        
                                for(var i=0; i<response.length; i++)
                                    {   
                                        var dept = response[i];
                                        All_Departments_List_temp.push(dept["Name"]);
                                    }
                                    
                                    itis.setState({
                                        All_Departments: All_Departments_List_temp,
                                    })
                                return All_Departments_List_temp;
                        }
                        };
                        
                        xhttp.send();
        
                }
                Load_All_Departments();

                var jobnameis = this.props.match.params.JobName;
                if(jobnameis != null && jobnameis != undefined)
                {
                    console.log(jobnameis)
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Job/" + jobnameis, true); 
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var response = JSON.parse(this.responseText)[0];
                        if(response != null){
                            
                            itis.setState({
                            Ages : response["AgeLimits"],
                            Dates : response["AllDates"],
                            Applied : response["Applied"],
                            ApplyLink : response["ApplyLink"],
                            Department : response["Department"],
                            How_To_Apply: response["HowToApply"],
                            Intrests: response["Intrests"],
                            Location: response["Location"],
                            Vacancies : response["NoofVacancies"],
                            Qualifications : response["Qualification"],
                            Salary : response["Salary"],
                            Title : response["Title"]
                        });

                        console.log(itis.state.Department);

                            
                            function Load_Qualifications(){
                                var quafs = [];
                                for(var i=0; i<itis.state.Qualifications.length; i++)
                                {
                                    console.log(itis.state.Qualifications);
                                    var tempQualification = itis.state.Qualifications[i];
                                    quafs.push(
                                        
                                        <div className="RoundBox">
                                            <div>
                                            {itis.state.Qualifications[i]}
                                            </div>
                                            <div className="CrossButton" onClick={()=>Remove_Qualification(tempQualification)}>
                                                X
                                            </div>
                                        </div>
                                        
                                    );
                                    
                                }

                                itis.setState({
                                    ShowQualification:quafs,
                                });
                                
                                return quafs;
                            }

                                    function Load_Ages(){
                                        var ages = [];
                                        
                                        for(var i=0; i<itis.state.Ages.length; i++)
                                        {
                                            var tempage = itis.state.Ages[i];
                                            ages.push(
                                                <div className="RoundBox">
                                                    <div>
                                                    {itis.state.Ages[i]}
                                                    </div>
                                                    <div className="CrossButton" onClick={()=>Remove_Age(tempage)}>
                                                        X
                                                    </div>
                                                </div>
                                                
                                            );

                                            
                                        }
                                        itis.setState({ShowAges: ages});
                                        return ages;
                                    }

                                    function Load_Dates(){
                                        var dates = [];
                                        
                                        for(var i=0; i<itis.state.Dates.length; i++)
                                        {
                                            var tempdate = itis.state.Dates[i];
                                            dates.push(
                                                
                                                <div className="RoundBox">
                                                    <div>
                                                    {itis.state.Dates[i]}
                                                    </div>
                                                    <div className="CrossButton" onClick={()=>Remove_Date(tempdate)}>
                                                        X
                                                    </div>
                                                </div>
                                                
                                            );

                                            
                                        }

                                        itis.setState({ShowDates: dates});
                                        return dates;
                                    }

                                    
        function Remove_Qualification(qualification){
            for(var i=0; i<itis.state.Qualifications.length; i++)
            {
                if(itis.state.Qualifications[i] === qualification)
                {
                    itis.state.Qualifications.splice(i, 1);
                    itis.state.Qualifications.splice(i, 1);
                    Load_Qualifications();
                }
            }
        }
        
        function Remove_Age(age){
            for(var i=0; i<itis.state.Ages.length; i++)
            {
                if(itis.state.Ages[i] === age)
                {
                    itis.state.Ages.splice(i, 1);
                    itis.state.ShowAges.splice(i, 1);
                    Load_Ages();
                }
            }
        }

        function Remove_Date(date){
            for(var i=0; i<itis.state.Dates.length; i++)
            {
                if(itis.state.Dates[i] === date)
                {
                    itis.state.Dates.splice(i, 1);
                    itis.state.Dates.splice(i, 1);
                    Load_Dates();
                }
            }
        }
                                    Load_Qualifications();
                                    Load_Ages();
                                    Load_Dates();

                        }
                    }
                    };
                    
                    xhttp.send();
                }


                itis.setState({
                    IsDataLoaded:true,
                });
        }
        
    }

    componentDidUpdate(prevProps){
        
    }
    

    render(){

        var itis = this;


        function Load_Qualifications(){
            var quafs = [];
            for(var i=0; i<itis.state.Qualifications.length; i++)
            {
                console.log(itis.state.Qualifications);
                var tempQualification = itis.state.Qualifications[i];
                quafs.push(
                    
                     <div className="RoundBox">
                        <div>
                        {itis.state.Qualifications[i]}
                        </div>
                        <div className="CrossButton" onClick={()=>Remove_Qualification(tempQualification)}>
                            X
                        </div>
                    </div>
                    
                );
                
            }

            itis.setState({
                ShowQualification:quafs,
            });
            
            return quafs;
        }

        function Load_Ages(){
            var ages = [];
            
            for(var i=0; i<itis.state.Ages.length; i++)
            {
                var tempage = itis.state.Ages[i];
                ages.push(
                    
                     <div className="RoundBox">
                        <div>
                        {itis.state.Ages[i]}
                        </div>
                        <div className="CrossButton" onClick={()=>Remove_Age(tempage)}>
                            X
                        </div>
                    </div>
                    
                );

                
            }
            itis.setState({ShowAges: ages});
            return ages;
        }

        function Load_Dates(){
            var dates = [];
            
            for(var i=0; i<itis.state.Dates.length; i++)
            {
                var tempdate = itis.state.Dates[i];
                dates.push(
                    
                     <div className="RoundBox">
                        <div>
                        {itis.state.Dates[i]}
                        </div>
                        <div className="CrossButton" onClick={()=>Remove_Date(tempdate)}>
                            X
                        </div>
                    </div>
                    
                );

                
            }

            itis.setState({ShowDates: dates});
            return dates;
        }

        function Save_Qualification(event){

            if(event.key == "Enter")
            {
                itis.state.Qualifications.push(document.getElementById("QualificationInputBox").value);
                Load_Qualifications();
            }

            
        }

        function Remove_Qualification(qualification){
            for(var i=0; i<itis.state.Qualifications.length; i++)
            {
                if(itis.state.Qualifications[i] === qualification)
                {
                    itis.state.Qualifications.splice(i, 1);
                    itis.state.Qualifications.splice(i, 1);
                    Load_Qualifications();
                }
            }
        }
        
        function Remove_Age(age){
            for(var i=0; i<itis.state.Ages.length; i++)
            {
                if(itis.state.Ages[i] === age)
                {
                    itis.state.Ages.splice(i, 1);
                    itis.state.ShowAges.splice(i, 1);
                    Load_Ages();
                }
            }
        }

        function Save_Ages(event){

            if(event.key == "Enter")
            {
                itis.state.Ages.push(document.getElementById("AgesInputBox").value);
                Load_Ages();
            }
            
        }

        function Save_Dates(event){

            if(event.key == "Enter")
            {
                itis.state.Dates.push(document.getElementById("datesInputBox").value);
                Load_Dates();
            }

            
        }

        function Remove_Date(date){
            for(var i=0; i<itis.state.Dates.length; i++)
            {
                if(itis.state.Dates[i] === date)
                {
                    itis.state.Dates.splice(i, 1);
                    itis.state.Dates.splice(i, 1);
                    Load_Dates();
                }
            }
        }

        //var DataforSearch = ["Indian Railways", "LIC", "POPO"];
        var searchedResults = [];

        function ONCHNG(e){
            itis.setState({Department: e});
            console.log(itis.state.Department);
            searchedResults = [];
            if(e != ""){
            for(var i=0; i<itis.state.All_Departments.length; i++)
            {
                var DataforSearch = itis.state.All_Departments[i];
                var result = DataforSearch.toLowerCase().includes(e);
                if(result == true)
                {
                    searchedResults.push(DataforSearch);
                }
            }
            }
        
            itis.setState({
                searchedRslts: searchedResults,
            });

        }

        function ChooseDepartment(e){
            itis.setState({
                Department: e,
            });
        }

        function TextHandlers(e){
            var vl = e.target.value;
            itis.setState({
                [e.target.name] : vl,
            });
        }


        function OnSave(){
            console.log(itis.state);

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Job/Add", true); 
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                alert("Saved! Succed");
            }
            };

            var information = {
                "AgeLimits" : itis.state.Ages,
                "AllDates" : itis.state.Dates,
                "Applied" : itis.state.Applied,
                "ApplyLink": itis.state.ApplyLink,
                "Department": itis.state.Department,
                "HowToApply": itis.state.How_To_Apply,
                "Intrests": itis.state.Intrests,
                "Location": itis.state.Location,
                "NoofVacancies": itis.state.Vacancies,
                "Qualification": itis.state.Qualifications,
                "Salary": itis.state.Salary,
                "Title": itis.state.Title
            }

            xhttp.send(JSON.stringify(information));

        }

        return (
        <>
        <div className="AddJobBox">
             <h1><b>new job application form</b></h1>
             <br/>
             <div>
                <h4>choose department</h4>
                <SearchDropDown onresult={ONCHNG} DefaultValue={this.state.Department} onValueChanged={ChooseDepartment} searchbar="choose department" searchresults={this.state.searchedRslts} /> 
             </div>
             <br/>
             <div>
                 <h4>title</h4>
                 <input name="Title" value={this.state.Title} onChange={TextHandlers} type="text" placeholder="title of the job" ></input>
             </div>
             <br/>
             <div>
                 <h4>location</h4>
                 <input name="Location" value={this.state.Location} onChange={TextHandlers} type="text" placeholder="location of the job" ></input>
             </div>
             <br/>
             <div>
                 <h4>no of vacancies</h4>
                 <input name="Vacancies" value={this.state.Vacancies} onChange={TextHandlers} type="text" placeholder="no. of vacancies" ></input>
             </div>
             <br/>
             <div>
                 <h4>salary</h4>
                 <input name="Salary" value={this.state.Salary} onChange={TextHandlers} type="text" placeholder="salary" ></input>
             </div>
             <br/>
             <div>
                 <h4>qualifications</h4>
                 <input id="QualificationInputBox" type="text" onKeyPress={Save_Qualification} placeholder="press ⌨️enter to save qualification" ></input>
                <div id="RoundBoxesQualification" className="RoundBoxes">
                    {this.state.ShowQualification}
                </div>
             </div>
             <br/>
             <div>
                 <h4>age limits</h4>
                 <input id="AgesInputBox" type="text" placeholder="press ⌨️enter to save age" onKeyPress={Save_Ages}></input>
                 <div id="RoundBoxesAges" className="RoundBoxes">
                    {this.state.ShowAges}
                </div>
             </div>
             <br/>
             <div>
                 <h4>important dates</h4>
                 <input id="datesInputBox" type="text" placeholder="press ⌨️enter to save dates" onKeyPress={Save_Dates} ></input>
                 <div id="RoundBoxesDates" className="RoundBoxes">
                    {this.state.ShowDates}
                </div>
             </div>
             <br/>
             <div>
                 <h4>apply link</h4>
                 <input type="text" name="ApplyLink" value={this.state.ApplyLink} onChange={TextHandlers} placeholder="https://" ></input>
             </div>
             <br/>
             <div>
                 <h4>how to apply url</h4>
                 <input type="text" name="How_To_Apply" value={this.state.How_To_Apply} onChange={TextHandlers} placeholder="https://" ></input>
             </div>
             <br/>
             <div>
                 <button onClick={OnSave}>save</button>
             </div>
             
        </div>
        </>
        );
    }
    
}

export default AddJob;