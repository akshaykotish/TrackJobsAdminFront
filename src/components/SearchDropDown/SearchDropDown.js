import React from 'react';
import "./SearchDropDown.css";

export default class SearchDropDown extends React.Component{
    
constructor(props)
{
    super(props);

    this.state = {
        defvalue: "",
        resultsvalue: [],
        visibility_hints:false,
    };
    
}

componentDidUpdate(prevprops){

    var itis = this;
    
    function OnResultItemClick(e){
        document.getElementById("SearchInput").value = e;
        itis.props.onValueChanged(e);
        itis.setState({
            defvalue: e,
        });
        itis.setState({
            visibility_hints:false,
        })
    }


    console.log(this.props.searchresults);
    if(prevprops.DefaultValue != this.props.DefaultValue){

        

        if(this.props.searchresults != prevprops.searchresults)
        {
            var rslts = this.props.searchresults;
                    var ot = [];
                    for(var i=0; i<rslts.length; i++)
                    {
                        var rs = rslts[i];
                        ot.push(
                                
                            <div onClick={()=>OnResultItemClick(rs)} className="ResultItem">{rslts[i]}</div>
                            
                        );
                    }
                var tO_show = ot.length  > 0 ? true:false;
            this.setState({
                resultsvalue:ot,
                visibility_hints:tO_show,
            });
        }

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


        function Switch_Result_Visibility(){
            if(this.state.visibility_hints == true){
                document.getElementById("resultbox").style.visibility = "visible";
            } 
            else{
                document.getElementById("resultbox").style.visibility = "hidden";
            }
        }

        var ld = this.props.onresult != undefined ? this.props.onresult : null;    
        var rslts = this.props.searchresults != undefined ? this.props.searchresults : null;    




        function Searching_Results(){
            if(ld == undefined || ld == null){
                itis.setState({
                    visibility_hints:false,
                });
            }
            else{
                if(document.getElementById("SearchInput").value == "")
                {
                    itis.setState({
                        visibility_hints:false,
                    });
                }
                else{
                    itis.setState({
                        visibility_hints:true,
                    });
                }
                ld(document.getElementById("SearchInput").value);
            }
        }

        
        return(
            <>
            <input type="text" id="SearchInput" value={this.state.defvalue} placeholder={this.props.searchbar} onChange={Searching_Results}></input>
            <div id="resultbox" className="Results" style={{visibility:itis.state.visibility_hints == true ? "visible" : "hidden",}}>
                {this.state.resultsvalue}
            </div>
            </>
        );
    }
}