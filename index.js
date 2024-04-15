const form = document.querySelector('#formSubmit')

const bookedSeats=[]
const totalBooked = document.getElementById('totalBooked')
function updateTotalBooked() {
    const bookedItems = document.querySelectorAll('#addMovie li')
    const bookedCount = bookedItems.length
    totalBooked.textContent = `Total Booked: ${bookedCount}`
}

const findSlot = document.getElementById('findSlot');
    findSlot.addEventListener('input', function(event) {
        const slotEntered = this.value
        const listItems = document.querySelectorAll('#addMovie li')
        const found = false

        for(let i = 0; i < listItems.length; i++) {
            const item = listItems[i]
            const itemText = item.textContent
            if(itemText.includes(slotEntered)) {
                item.style.display='block'
            } else {
                item.style.display='none'
        } 
    }

    const message = document.querySelector('#addMovie p');
    if(message) {
        message.remove();
        if(!found) {
            const noDisplayMessage = document.createElement('p');
            noDisplayMessage.textContent = 'Nothing to display';
            document.getElementById('addMovie').appendChild(noDisplayMessage); 
        } 
    } 
    
});

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const userName = event.target.userName.value
    const seatNumber = event.target.seatNumber.value

    const obj = {
        userName: userName,
        seatNumber: seatNumber
    }

    const newObj = JSON.stringify(obj)
    localStorage.setItem(userName, newObj)

    if(bookedSeats.includes(seatNumber)) {
        alert('This seat is already booked. Please choose another seat.')
        return
    }


//post user details
axios
    .post("https://crudcrud.com/api/e913dc1730c94e8dbabf720096503a60/moviebooking",obj)
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error))

event.target.reset()
})


//get user details
window.addEventListener('DOMContentLoaded', () => {
    axios
        .get("https://crudcrud.com/api/e913dc1730c94e8dbabf720096503a60/moviebooking")
        .then((response) => {
            console.log(response)
            response.data.forEach((userData) => {
                displayUserOnScreen(userData)
                bookedSeats.push(userData.seatNumber)
            });
        })
        .catch((error) => console.log(error))
})

function displayUserOnScreen(obj) {

    const mainList = document.querySelector('#addMovie')

    const list = document.createElement('li')
    list.innerHTML = `UserName: ${obj.userName} - SeatNumber: ${obj.seatNumber}`
    mainList.appendChild(list)
    list.style.marginBottom = '10px'

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete'
    list.appendChild(deleteButton)
    deleteButton.style.marginRight = '10px'
    deleteButton.style.marginLeft = '10px'

    const editButton = document.createElement('button')
    editButton.innerHTML = 'Edit'
    list.appendChild(editButton)

    deleteButton.addEventListener('click', function(event) {
        list.remove()
        const userId = obj._id
        axios
            .delete(`https://crudcrud.com/api/e913dc1730c94e8dbabf720096503a60/moviebooking/${userId}`)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })

        const index = bookedSeats.indexOf(seatNumber)
        if(index !== -1) {
            bookedSeats.splice(index, 1)
        }
        updateTotalBooked()
    })

    editButton.addEventListener('click', function(event) {
        list.remove()
        const userId = obj._id
        axios
            .delete(`https://crudcrud.com/api/e913dc1730c94e8dbabf720096503a60/moviebooking/${userId}`)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })

        document.getElementById('userName').value = obj.userName
        document.getElementById('seatNumber').value = obj.seatNumber

        const index = bookedSeats.indexOf(seatNumber)
        if(index !== -1) {
            bookedSeats.splice(index, 1)
        }
        updateTotalBooked()
    })
    updateTotalBooked()
}




