import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SavingsIcon from '@mui/icons-material/Savings';
import '../../style/default_styles.css';
export const percent = new Intl.NumberFormat('default', {
    style: 'percent'
}); 

export function pickIcon(category) {
    let icon = null;
    switch(category){
        case "Groceries":
        case "Grocery":
            icon = <ShoppingCartIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></ShoppingCartIcon>;    
            break;
        case "Internet":
            icon = <WifiIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></WifiIcon>;
            break;
        case "Savings":
            icon = <SavingsIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></SavingsIcon>;
            break;
        case "Phone":
            icon = <LocalPhoneIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></LocalPhoneIcon>;
            break;
        case "Discretionary":
            icon = <LocalAtmIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></LocalAtmIcon>;
            break;
        default:
            break;
    }
    return(
        <div className="tooltip" style={{width:'100%'}}>
            <Card variant="outlined" style={{backgroundColor:'rgb(39, 48, 61)',outlineWidth:'2px',outlineStyle:'solid',outlineColor:'rgba(255, 255, 255, 0.2)',width:'100%', height:'100%'}}>
                {icon}
            </Card>
            <span className='tooltiptext'>{category}</span>
        </div>
    );
}

export function spendCard (val,i) {
    let name = Object.keys(val)[0];
    let percentage = Object.values(val)[0];
    let icon = pickIcon(name);
    let textColor = "rgb(56, 194, 25)";
    if(percentage*100 >= 70){
        textColor = "rgb(255,44,44)";
    }else if(percentage >=50){
        textColor = "orange";
    }else if(percentage >= 30){
        textColor = "yellow";
    }  
    return  <Card variant="outlined" key={"card"+i} style={{backgroundColor:'rgb(39, 48, 61)',outlineWidth:'2px',outlineStyle:'solid',outlineColor:'rgba(255, 255, 255, 0.2)',paddingBottom:'2%',paddingTop:'2%',rowGap:'2%',flexDirection:'column',display:'flex',justifyContent:'center',alignContent:'center',width:'10%', height:'50%'}}>
                <div style={{color:'inherit', height:'50%'}}>{icon}</div>
                <div style={{fontSize:'8pt',marginTop:'12%',color:`${textColor}`, fontWeight:'bolder',height:'50%'}}>{percentage.format(percent)} spent</div>
            </Card>;
}