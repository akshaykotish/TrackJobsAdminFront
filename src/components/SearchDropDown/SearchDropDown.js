import React from 'react';
import "./SearchDropDown.css";

export default class SearchDropDown extends React.Component{
    
constructor(props)
{
    super(props);

    this.state = {
        defvalue: "",
    };
    
}

componentDidUpdate(prevprops){
    if(prevprops.DefaultValue != this.props.DefaultValue){
        if(this.props.DefaultValue != null && this.props.DefaultValue != undefined)
    {
        console.log("+." + this.props.DefaultValue);
        this.setState({
            defvalue: this.props.DefaultValue,
        });
    }
    }
}

    render(){

        var itis = this;


        function Switch_Result_Visibility(e){
            if(document.getElementById("resultbox") != null){
                document.getElementById("resultbox").style.visibility = e;
            } 
        }

        var ld = this.props.onresult != undefined ? this.props.onresult : null;    
        var rslts = this.props.searchresults != undefined ? this.props.searchresults : null;    

        Switch_Result_Visibility();


        function OnResultItemClick(e){
            document.getElementById("SearchInput").value = e;
            itis.props.onValueChanged(e);
            itis.setState({
                defvalue: e,
            });
            Switch_Result_Visibility("hidden");
        }

        function Load_Results(){
            if(rslts != null)
            {
                var ot = [];
                for(var i=0; i<rslts.length; i++)
                {
                    var rs = rslts[i];
                    ot.push(
                            
                        <div onClick={()=>OnResultItemClick(rs)} className="ResultItem">{rslts[i]}</div>
                        
                    );
                }
                Switch_Result_Visibility("visible");
                return ot;
            }
        }

        function Searching_Results(){
            if(ld == undefined || ld == null){
                Switch_Result_Visibility();
            }
            else{
                if(document.getElementById("SearchInput").value == "")
                {
                    Switch_Result_Visibility();
                }
                ld(document.getElementById("SearchInput").value);
            }
        }

        
        return(
            <>
            <input type="text" id="SearchInput" value={this.state.defvalue} placeholder={this.props.searchbar} onChange={Searching_Results}></input>
            <div id="resultbox" className="Results">
                {Load_Results()}
            </div>
            </>
        );
    }
}