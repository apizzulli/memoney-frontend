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
export function getBudget(id){
    return fetch(`http://localhost:8080/getBudget/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

export async function getAllBudgets(userId){
    let token = localStorage.getItem("jwt");
    return fetch(`http://localhost:8080/budgets/getAll/${userId}`,
    {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": `Bearer ${token}`,
            "Accept":"application/json",
            "Content-Type":"application/json",
    },
        method: "GET"
    })
    .then((response) => {
        console.log("getTransactions in controller returns status");
        return response.json()
    })
    .catch((error)=> {
        console.log("error = "+error);
        return 0;
    });
}

