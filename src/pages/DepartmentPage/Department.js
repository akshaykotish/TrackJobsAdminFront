
const Department = ({Illustrator, iLogo, Name, ForShowing})=>{
    
    
    return (
        <>
        <div className="ItsDepartment" style={{backgroundImage:'url("' + Illustrator + '")',}}>
        <div className="Bottom">
            <div className="L">
            <img width="100%" height="100%" src={iLogo}/>
            </div>
            <div className="C">
            {Name}
            </div>
            <div className="R">
                <div onClick={()=>ForShowing(Name, iLogo, Illustrator)}>
                <img width="20" src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/>
                </div>
            </div>
            
            
        </div>
        </div>
        </>
    );
}

export default Department;