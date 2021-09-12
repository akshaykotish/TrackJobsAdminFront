import React from 'react';
import NavBar from '../../components/NavBar/Navbar'; 
import './Job.css';
import SearchDropDown from '../../components/SearchDropDown/SearchDropDown';
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../firebase/index";

import Logo from '../../assets/images/ui_related/minilogo.png';
import Delete from '../../assets/images/ui_related/delete.png';

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
            Stories: [],
            Show_Stories: [],
        }

        var itis = this;
        if(itis.state.IsDataLoaded == false){
            console.log("Departments Loading");
            function Load_All_Departments(){
                
                var All_Departments_List_temp = [];
                    var xhttp = new XMLHttpRequest();
                        xhttp.open("GET", "http://localhost:4178/Departments", true); 
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
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "http://localhost:4178/Job/" + jobnameis, true); 
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var response = JSON.parse(this.responseText)[0];
                        if(response != null){
                            
                            console.log("Date is " + response["AllDates"]);
                            itis.setState({
                            Ages : response["AgeLimits"] != null && response["AgeLimits"] != undefined  && response["AgeLimits"] != "[object Object]" ? response["AgeLimits"] : [],
                            Dates : response["AllDates"] != null && response["AllDates"] != undefined  && response["AllDates"] != "[object Object]" ? response["AllDates"] : [],
                            Applied : response["Applied"],
                            ApplyLink : response["ApplyLink"],
                            Department : response["Department"],
                            How_To_Apply: response["HowToApply"],
                            Intrests: response["Intrests"],
                            Location: response["Location"],
                            Vacancies : response["NoofVacancies"],
                            Qualifications : response["Qualification"] != null && response["Qualification"] != undefined  && response["Qualification"] != "[object Object]" ? response["Qualification"] : [],
                            Salary : response["Salary"],
                            Title : response["Title"],
                            Stories: response["Stories"] != null && response["Stories"] != undefined  && response["Stories"] != "[object Object]" ? response["Stories"] : [],
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

        
        function Load_Stories(){
            
            var all_stories = [];
            
            for(var i=0; i<itis.state.Stories.length; i++){

                var Its_url = itis.state.Stories[i];

                all_stories.push(
                    <>
                    <div className="StoryBox">
                        <div className="Imag">
                            <img src={Its_url} width="100%" height="100%"></img>
                        </div>
                        <div className="ImagDelete" onClick={()=>Remove_URL(i-1)}>
                            <img src={Delete} width="100%" height="100%"></img>
                        </div>
                    </div>
                    </>
                );
            }
            console.log(itis.state.Show_Stories.length + " == " + all_stories.length);
            itis.setState({
                Show_Stories:all_stories,
            });
            console.log(all_stories);
        }

        function Remove_URL(index){
            console.log(index);
            itis.state.Stories.splice(index, 1);
            Load_Stories();
        }

                                    Load_Stories();
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

        function Upload_To_Cloud(touploadfile){

            const storageRef = ref(storage, 'Stories/' + itis.state.Title + "/" + touploadfile.name);
    
    const uploadTask = uploadBytesResumable(storageRef, touploadfile);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                        Add_Stories(downloadURL);
                });
            }
            );
    
        }

        function Create_new_Story(){
            if(itis.state.Title != ""){
                var fileloader = document.getElementById("Upload_Stories");
                if('files' in fileloader && fileloader.files.length > 0)
                {
                    var tfile = fileloader.files[0];
                    if(tfile != null && 'name' in tfile)
                    {
                        Upload_To_Cloud(tfile);
                    }
                }
            }
        }

        
        function Load_Stories(){
            
            var all_stories = [];
            
            for(var i=0; i<itis.state.Stories.length; i++){

                var Its_url = itis.state.Stories[i];

                all_stories.push(
                    <>
                    <div className="StoryBox">
                        <div className="Imag">
                            <img src={Its_url} width="100%" height="100%"></img>
                        </div>
                        <div className="ImagDelete" onClick={()=>Remove_URL(i-1)}>
                            <img src={Delete} width="100%" height="100%"></img>
                        </div>
                    </div>
                    </>
                );
            }
            console.log(itis.state.Show_Stories.length + " == " + all_stories.length);
            itis.setState({
                Show_Stories:all_stories,
            });
            console.log(all_stories);
        }

        function Add_Stories(url){
            itis.state.Stories.push(url);
            Load_Stories();
        }

        function Remove_URL(index){
            console.log(index);
            itis.state.Stories.splice(index, 1);
            Load_Stories();
        }


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
                console.log(itis.state.Dates);
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
            console.log("=>" + e);
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
            xhttp.open("POST", "http://localhost:4178/Job/Add", true); 
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
                "Title": itis.state.Title,
                "Stories":itis.state.Stories,
            }

            xhttp.send(JSON.stringify(information));

        }

        return (
        <>

        <div className="StoryBoard">
             <div className="StoryBox Add_Story">
                <div>
                    <input id="Upload_Stories" type="file" hidden placeholder="name of the department" onChange={Create_new_Story} ></input>
                    <label className="UploadStoriesButtonLabel" htmlFor="Upload_Stories">+</label >
                </div>
             </div>
             {this.state.Show_Stories}
            
        </div>


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