export async function newUser(userDTO) {
    return fetch('http://localhost:8080/user/createAccount',
        {
            headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
            method: "POST",
            body: JSON.stringify(userDTO)
        }).then((response)=> {
            if(response.status == "201"){
                return response.json();
            }
            else
                return 0;
        })
}
export async function login (userDTO) {
    let budgets = null;
    return fetch('http://localhost:8080/user/login',
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(userDTO)
    }).then((response) => {
        console.log("response.status = "+response.status);
        if(response.status != "200"){
            return 0;
        }
        else{
            return response.json();
        }
    }).catch((error)=>{
        return 2;
    })
    //     const budgetData = data; 
    //     if (budgetData) {
    //         budgets= budgetData;//budgets = budgetData;
    //     } else {
    //         console.error("Unable to access budgets");
    //         return null;
    //     }
    //});
}
export async function email() {
    return fetch('http://localhost:8080/user/testEmail',
        {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Accept":"application/json",
                "Content-Type":"application/json",
        },
            method: "GET"
        }).then((response)=> {
            console.log(response);
        })
}