// ########### Selecting Elements 
const userFromData = document.getElementById('form');
const tbody = document.getElementById('tbody');


// utilities function
function userID() {
    return Date.now() + Math.round(Math.random() * 298).toString();
}

// ######## localStorage databae 

// getAllDataFromLocalStorage 
function getAllDataFromLocalStorage() {
    let userData = [];
    const rowData = localStorage.getItem('datas');
    if (rowData) {
        userData = JSON.parse(rowData);
    }
    return userData;
};

// add Multiple data 
function addMultipleDataToLocalStorage(userDatas) {
    localStorage.setItem('datas', JSON.stringify(userDatas))
}
// addSingle data from database
function addSingleDataToLocalStorage(userData) {
    const userDatas = getAllDataFromLocalStorage();
    userDatas.push(userData);
    addMultipleDataToLocalStorage(userDatas)
}
// ############ handler functions 

// userfrom data collect
function dataCollectFromUser(e) {
    e.preventDefault();
    const id = userID();
    const userData = {
        id,
        status: 0
    };
    [...userFromData.elements].forEach(element => {
        if (element.name) {
            userData[element.name] = element.value;
        }
    })
    userFromData.reset();
    addSingleDataToLocalStorage(userData);
    upadateUI();

}
// create tr 
function createTr({ firstname, lastname, date, gender, religion, relation, address, email, phone }) {
    const formattedDate = new Date(date).toDateString();
    return `        <tr>
                        <td><input type="checkbox"></td>
                        <td>1</td>
                        <td>${firstname}</td>
                        <td>${lastname}</td>
                        <td>${formattedDate}</td>
                        <td>${gender}</td>
                        <td>${religion}</td>
                        <td>${relation}</td>
                        <td>${address}</td>
                        <td>${email}</td>
                        <td>${phone}</td>
                     
                        <td>
                            <button id="edit">
                                <i class="fas fa-pen"></i>
                            </button>
                            <button id="check">
                                <i class="fas fa-check"></i>
                            </button>
                            <button id="delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    `
}
// Update Ui function 
function upadateUI() {
    const userDatas = getAllDataFromLocalStorage();
    console.log(userDatas)
    const userDataArray = userDatas.map((userData) => {
        return createTr(userData)
    });
    const userDataList = userDataArray.join("");
    tbody.innerHTML = userDataList;
}
upadateUI();

// ######## events listeners 
userFromData.addEventListener('submit', dataCollectFromUser);



