// import Menu, { MenuPaper } from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useState } from 'react';

// export default function CategoryForm({savedCategories, saveCategories}) {
//     const [ anchorEl, setAnchorEl ] = useState(null);
//     const [ menuItem, setMenuItem ] = useState("Select");

//     function Category(name, amount){
//         this.name = name;
//         this.amount = amount;
//     }

//     const CATEGORIES ={
//         GROCERY: "Grocery",
//         DISCR: "Discretionary",
//         SAVINGS: "Savings",
//         PHONE: "Phone",
//         INTERNET: "Internet",
//         CUSTOM: "CUSTOM"
//     }

//     window.addEventListener('mouseup', function(e) {
//         var x = document.querySelector('#categoryForm');
//         if (e.target != document.querySelector(".menuItem") && Boolean(anchorEl)) {
//             setAnchorEl(null);
//         }
//     });

//     const handleMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget.parentElement);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     }

//     const menuClick = (chosenCategory) => {
//         setMenuItem(chosenCategory);
//         setAnchorEl(null);
//     }

//     const addCategory = (event)=> {
//         const amount = event.currentTarget.catAmount.value;
//         event.target.reset();
//         event.preventDefault();
//         let newCat = new Category(menuItem, amount);
//         let newCats = [...savedCategories];
//         newCats.push(newCat);
//         saveCategories(newCats);
//         setMenuItem("Select");
//     }
//     const editView = Object.keys(savedCategories).map(
//                         (name)=>(
//                         <div style={{display:'flex'}}>
//                             <Input defaultValue={name} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
//                             <Input defaultValue={savedCategories[name]+"$"} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
//                             <DeleteIcon></DeleteIcon>
//                         </div>
//                     ));
//     const spendCard = (val,i) => {
//         let name = Object.keys(val)[0];
//         let percentage = Object.values(val)[0];
//         let icon = pickIcon(name);
//         let textColor = "rgb(56, 194, 25)";
//         if(percentage*100 >= 70){
//             textColor = "rgb(255,44,44)";
//         }else if(percentage >=50){
//             textColor = "orange";
//         }else if(percentage >= 30){
//             textColor = "yellow";
//         }  
//         return  <Card variant="outlined" key={"card"+i} style={{backgroundColor:'rgb(39, 48, 61)',outlineWidth:'2px',outlineStyle:'solid',outlineColor:'rgba(255, 255, 255, 0.2)',paddingBottom:'2%',paddingTop:'2%',rowGap:'2%',flexDirection:'column',display:'flex',justifyContent:'center',alignContent:'center',width:'10%', height:'50%'}}>
//                     <div style={{color:'inherit', height:'50%'}}>{icon}</div>
//                     <div style={{fontSize:'8pt',marginTop:'12%',color:`${textColor}`, fontWeight:'bolder',height:'50%'}}>{percent.format(percentage)} spent</div>
//                 </Card>;
//     }
//     return(
//         <div style={{width: '100%'}}>
//             <div className='verticalFlex' style={{height:'100%', width:'70%'}}>
//                 <div className='horizontalFlex' style={{columnGap:'3%',width:'100%', height:'25%'}}>
//                 {
//                     remainingVals.map((val, i)=>
//                         spendCard(val,i)
//                     )
//                 }
//                 </div>
//             </div>
//             {/* <Menu id="categoryMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
//                 {Object.keys(CATEGORIES).map((name,i)=><MenuItem id="menuItem" onClick={()=>menuClick(CATEGORIES[name])}>{CATEGORIES[name]}</MenuItem>)}
//             </Menu>
//             <div style={{display: 'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
//                 <div style={{display: 'flex', alignItems:'center'}}>
//                     <h3>{"Name: "+menuItem}</h3>
//                     <ArrowDropDownIcon style={{display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
//                     <ArrowDropUpIcon style={{display:anchorEl === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>
//                 </div>
//             </div>
//             <form onSubmit={addCategory} style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
//                 <Input type="text" name="catAmount" sx={{width:200, height: 20}} placeholder="Amount" required></Input>
//                 <Button className="button" variant = "outlined" style={{fontFamily:'inherit',color:'inherit'}} type="submit">Done</Button>
//             </form> */}
//         </div>
//     );
// }
                    