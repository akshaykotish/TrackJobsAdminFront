import './Department.css';
import react, {useState} from 'react';
import Logo from '../../assets/images/ui_related/minilogo.png';
import Department from './Department';
import Illustration from '../../assets/images/ui_related/railwaysIllustration.jpg';
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../firebase/index";


class AddDepartment extends react.Component{

    constructor(props){
        super(props);


        this.state = {
            Department_Name:this.props.depname,
            Department_Logo:this.props.logo,
            Department_Illustrator:this.props.illustrator,
        }

        
        console.log("here is " + this.props.depname);
        

    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.depname != this.props.depname)
        {
            this.setState({
                Department_Name:this.props.depname,
                Department_Logo:this.props.logo,
                Department_Illustrator:this.props.illustrator,
            });
        }
    }

    render(){
        
        var itis = this;

    function updateDName(e){
        itis.setState({
            Department_Name : e.target.value,
        })
    }


    function HidePopupModel(){
        //this.props.show = "hidden";
        document.getElementsByClassName("Popup")[0].style.visibility = "hidden";
    }

    function Upload_To_Cloud(touploadfile, islogo){

        const storageRef = ref(storage, 'Departments/' + itis.state.Department_Name + "/" + touploadfile.name);

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
                if(islogo == true){
                    itis.setState({
                        Department_Logo:downloadURL,
                    });
                }
                else{
                    itis.setState({
                        Department_Illustrator:downloadURL,
                    });
                }
            });
        }
        );

    }

    function Upload_File(islogo){
        
        var fileloader = islogo ? document.getElementById("Upload_Logo") : document.getElementById("Upload_Illustration");
        if('files' in fileloader && fileloader.files.length > 0)
        {
            var tfile = fileloader.files[0];
            if(tfile != null && 'name' in tfile)
            {
                Upload_To_Cloud(tfile, islogo);
            }
        }
    }


    function Save_Department(){
        if(document.getElementById("DepartmentName") != null && document.getElementById("DepartmentName").value != "")
        {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Department/Add", true); 
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
            HidePopupModel();
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                itis.props.onsave();
            }
            };

            var information = {
                "Illustrator" : itis.state.Department_Illustrator,
                "Logo" : itis.state.Department_Logo,
                "Name" : itis.state.Department_Name
            }
            xhttp.send(JSON.stringify(information));
            
        }
    }

    function LoadingElements(){
        itis.setState(
            {
                Department_Name:itis.props.depname,
                Department_Logo: itis.props.logo,
                Department_Illustrator:itis.props.illustrator,
            }
        );
    }

    
    return (
        <>
            <div style={{visibility:itis.props.show,}} className="mainbox Popup">
                <div className="leftbox ls">
                <div className="FormBox" >
                <div className="TitleBox">create new <br/><h3>department</h3></div>
                <h5>department name</h5>
                    <input id="DepartmentName" type="text" placeholder="name of the department" value={itis.state.Department_Name} onChange={updateDName}></input>
                    <br/><br/>
                    <h5>upload graphics</h5>
                    <input id="Upload_Logo" type="file" hidden placeholder="name of the department" onChange={()=>Upload_File(true)} ></input>
                    <label className="UploadButtonLabel" htmlFor="Upload_Logo">upload logo</label >
                    <br/>
                    <input id="Upload_Illustration" type="file" hidden placeholder="name of the department" onChange={()=>Upload_File(false)} ></input>
                    <label className="UploadButtonLabel" htmlFor="Upload_Illustration">upload illustrator </label >
                    <br/>
                    <div className="ButtonBox">
                    <button className="depbutton" onClick={Save_Department}>save</button>
                    <button className="depbutton" onClick={HidePopupModel}>cancel</button>
                </div>
                </div>
                </div>
                <div className="rightbox">
                <div id="imillustrator" className="ItsDepartment" style={{height:210, backgroundImage: "url('" + itis.state.Department_Illustrator + "')",}} >
                <div className="Logo">
                    <img id="imlogo" src={itis.state.Department_Logo} width="60%"/>
                    </div>
                    <h5 id="dname">{itis.state.Department_Name}</h5>
                    </div>
                </  div>
            </div>
        </>
    );
    }

}

/*
const AddDepartment = ({show, depname, logo, illustrator, onsave})=>{

    const [Department_Name, Change_Department_Name] = useState(()=>depname);
    const [Department_Logo, Change_Department_Logo] = useState(()=>logo);
    const [Department_Illustrator, Change_Department_Illustrator] = useState(()=>illustrator); 

    

    function updateDName(e){
        Change_Department_Name(e.target.value);
    }


    function HidePopupModel(){
        show = "hidden";
        document.getElementsByClassName("Popup")[0].style.visibility = "hidden";
    }

    function Upload_To_Cloud(touploadfile, islogo){

        const storageRef = ref(storage, 'Departments/' + Department_Name + "/" + touploadfile.name);

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
                if(islogo == true){
                    Change_Department_Logo(downloadURL);
                }
                else{
                    Change_Department_Illustrator(downloadURL);
                }
            });
        }
        );

    }

    function Upload_File(islogo){
        
        var fileloader = islogo ? document.getElementById("Upload_Logo") : document.getElementById("Upload_Illustration");
        if('files' in fileloader && fileloader.files.length > 0)
        {
            var tfile = fileloader.files[0];
            if(tfile != null && 'name' in tfile)
            {
                Upload_To_Cloud(tfile, islogo);
            }
        }
    }


    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      }

    function Save_Department(){
        if(document.getElementById("DepartmentName") != null && document.getElementById("DepartmentName").value != "")
        {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Department/Add", true); 
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
            HidePopupModel();
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                onsave();
            }
            };

            var information = {
                "Illustrator" : Department_Illustrator,
                "Logo" : Department_Logo,
                "Name" : Department_Name
            }
            xhttp.send(JSON.stringify(information));
            
        }
    }

    function LoadingElements(){
        console.log("Hello World");
        Change_Department_Name(depname);
        Change_Department_Logo(logo);
        Change_Department_Illustrator(illustrator);
        console.log(Department_Name + " " + Department_Logo);
    }

    
    return (
        <>
            <div style={{visibility:show,}} className="mainbox Popup">
                <div className="leftbox ls">
                <div className="FormBox" >
                <div className="TitleBox">create new <br/><h3>department</h3></div>
                <h5>department name</h5>
                    <input id="DepartmentName" type="text" placeholder="name of the department" value={Department_Name} onChange={updateDName}></input>
                    <br/><br/>
                    <h5>upload graphics</h5>
                    <input id="Upload_Logo" type="file" hidden placeholder="name of the department" onChange={()=>Upload_File(true)} ></input>
                    <label className="UploadButtonLabel" htmlFor="Upload_Logo">upload logo</label >
                    <br/>
                    <input id="Upload_Illustration" type="file" hidden placeholder="name of the department" onChange={()=>Upload_File(false)} ></input>
                    <label className="UploadButtonLabel" htmlFor="Upload_Illustration">upload illustrator </label >
                    <br/>
                    <div className="ButtonBox">
                    <button className="depbutton" onClick={Save_Department}>save</button>
                    <button className="depbutton" onClick={HidePopupModel}>cancel</button>
                </div>
                </div>
                </div>
                <div className="rightbox">
                <div id="imillustrator" className="ItsDepartment" style={{height:210, backgroundImage: "url('" + Department_Illustrator + "')",}} >
                <div className="Logo">
                    <img id="imlogo" src={Department_Logo} width="60%"/>
                    </div>
                    <h5 id="dname">{Department_Name}</h5>
                    </div>
                </  div>
            </div>
        </>
    );
}
*/

export default AddDepartment;
