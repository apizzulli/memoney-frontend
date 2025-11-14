export async function newBudget(userId, newBudg, token) {
    return fetch(process.env.REACT_APP_BACKEND_URL + `/budgets/create/${userId}`,
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
    let token = localStorage.getItem("jwt");
    return fetch(process.env.REACT_APP_BACKEND_URL + `/budgets/edit/${budgId}`,
    {
        headers: {
        "Authorization": `Bearer ${token}`,
        "Accept":"application/json",
        "Content-Type":"application/json",
    },
        method: "PATCH",
        body: JSON.stringify(editedBudg)
    }).then((response)=> {
        return response.json();
    }).catch((error)=>{
        return 0;
    })
}
export function getBudget(id){
    return fetch(process.env.REACT_APP_BACKEND_URL + `/getBudget/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

export async function getAllBudgets(userId){
    let token = localStorage.getItem("jwt");
    return fetch(process.env.REACT_APP_BACKEND_URL + `/budgets/getAll/${userId}`,
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
        return response.json()
    })
    .catch((error)=> {
        console.log("error = "+error);
        return 0;
    });
}

