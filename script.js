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
        const tr = createElement('tr', "item", `<td>${el.id}</td>
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

    const params = {
        user_name: userName,
        score: userScore
    }

    if (userScore.length === 0 || userName.length === 0) {
        // alert('please fill the user name and score');
        $('.toastify').style.backgroundColor = 'crimson';
        $('.toastify').innerHTML = `<h5>Not enough info</h5>`
        $('.toastify').style.transform = 'translateX(0)';
        setTimeout(() => {
            $('.toastify').style.transform = 'translateX(200%)';

        }, 1500)
    }
    else {
        $('.toastify').style.backgroundColor = 'lime';
        $('.toastify').innerHTML = `<h5>Successfully added</h5>`
        $('.toastify').style.transform = 'translateX(0)';
        setTimeout(() => {
            fetch('http://localhost:7777/user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params)
            })
        }, 1500)
    }
}


$('#send').addEventListener('submit', () => {
    addUser()
})



//-------------------------DELETE FUNCTION-------------//


$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        let id = e.target.getAttribute('data-del');
        deleteUser(id)
    }

})


const deleteUser = (id) => {
    $('.toastify').style.transform = 'translateX(0)'
    setTimeout(() => {
        fetch(`http://localhost:7777/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })

    }, 2000)
}
//-------------------------DELETE FUNCTION END-------------//


$('tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        let id = e.target.getAttribute('data-edit');
        editUser(id)
    }

})

const editUser=(id)=>{
    fetch(`http://localhost:7777/user/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({user_name:"Farrux",score:"45"})
    })
}