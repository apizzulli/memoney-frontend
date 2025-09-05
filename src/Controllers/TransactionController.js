
export async function createTransaction (budgetId, transaction) {
    let token = localStorage.getItem("jwt");
    console.log("adding transaction");
    return fetch(`http://localhost:8080/transactions/add/${budgetId}`,
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
export async function getTransactions(budgetId){
    let token = localStorage.getItem("jwt");
    return fetch(`http://localhost:8080/transactions/get/${budgetId}`,
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

export async function deleteTransaction(transId, budgId){
    let id = transId + "-" + budgId;
    let token = localStorage.getItem("jwt");
    return fetch(`http://localhost:8080/transactions/delete/${id}`,
    {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Authorization": `Bearer ${token}`,
            "Accept":"application/json",
            "Content-Type":"application/json",
    },
        method: "POST"
    })
    .then((response) => {
        return response.json()
    })
    .catch((error)=> {
        console.log("DELETE error = "+error);
        return 0;
    });
}
