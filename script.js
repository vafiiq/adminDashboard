"use strict";

// -----------------GET USER LIST-----------//

function getUser() {
    fetch('http://localhost:7777/user')
        .then((response) => response.json())
        .then((result) => renderData(result))

}

getUser()


// -----------------GET USER LIST-----------//

//----------------RENDER FUNCTION-----------------//
function renderData(data = []) {

    data.length > 0 ? data.forEach((el) => {
        const tr = createElement('tr', "item", `<td>1</td>
        <td>${el.user_name}</td>
        <td>${el.score}</td>
        <td> <button class="btn btn-primary" data-edit="${el.id}">EDIT</button> </td>
        <td> <button class="btn btn-danger" data-del="${el.id}">DELETE</button> </td>`);

        $('tbody').appendChild(tr);

    }) : $('tbody').innerHTML = "User list is empty"


}

//----------------RENDER FUNCTION END-----------------//


const addUser = () => {
    const userName = $("#userName").value.trim();
    const userScore = $("#userScore").value.trim();
    const params={
        user_name: userName,
        score: userScore
    }

    if (userScore.length === 0 || userName.length === 0) {
        alert('please fill the user name and score');
    }
    else {
        fetch('http://localhost:7777/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
    }
}


$('#send').addEventListener('submit', () => {
    addUser()
})
