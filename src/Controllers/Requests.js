export async function newUser(userDTO) {
    await fetch('http://localhost:8080/createAccount',
        {
            headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
        },
            method: "POST",
            body: JSON.stringify(userDTO)
        }).then((response)=> {
            if(response.status == "202"){
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
export async function newBudget(userId, newBudg, token) {
    return fetch(`http://localhost:8080/budgets/create/${userId}`,
    {
        headers: {
        "Authorization": `Bearer ${token}`,
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(newBudg)
    })
    .then((response) => {
        console.log("newBudget in controller returns "+response.status);
        if(response.status == "201"){
            return response.json();
        }
        else if(response.status == "400"){
            return 0;
        }
    }).catch((error)=>{
        return 0;
    })

}
export async function editBudget(editedBudg, budgId) {
    return fetch(`http://localhost:8080/budgets/edit/${budgId}`,
    {
        headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(editedBudg)
    }).then((response)=> {
        return response.json();
    }).catch((error)=>{
        return 0;
    })
}
export async function createTransaction (budgetId, transaction) {
    let token = localStorage.getItem("jwt");
    console.log("adding transaction");
    return fetch(`http://localhost:8080/budgets/transactions/add/${budgetId}`,
    {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": `Bearer ${token}`,
            "Accept":"application/json",
            "Content-Type":"application/json",
    },
        method: "POST",
        body: JSON.stringify(transaction)
    })
    .then((response) => {return response.json()})
    .catch((error)=> {
        console.log("error = "+error);
        return 0;
    });
}
export function getBudget(id){
    return fetch(`http://localhost:8080/getBudget/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));
}
