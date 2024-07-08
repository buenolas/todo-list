let dataBase = [] // create data base

const getDataBase = () => {
    return JSON.parse(localStorage.getItem('todoList')) ?? []; //if the local storage is empty, then the ( ?? ) sets the local storage an empty array ( [] )
}

const setDataBase = (data) => {
    localStorage.setItem('todoList', JSON.stringify(data));
}

const createItem = (text, status, index) => { // this function creates a new task on the screen
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>   
        <div>${text}</div>
        <input type="button" value="X" data-index=${index}>
    `   //data-index set the index of the element in the data base array
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {  //cleans the tasks so every time it updates will be shown correctly
    const todoList = document.getElementById('todoList');
    
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
} 

const updateScreen = () => {    //updates the screen
    cleanTasks()
    const dataBase = getDataBase();

    dataBase.forEach( (item, index) => createItem(item.task, item.status, index));  

}

document.getElementById('newItem').addEventListener('keypress',event =>{    //listen to when the enter key is pressed and send the information of the task
    const key = event.key;
    
    if(key == 'Enter'){
        const dataBase = getDataBase();

        dataBase.push({"task": event.target.value, "status": ""});

        setDataBase(dataBase);
        
        updateScreen();
        
        event.target.value = '';
    }
});

const removeItem = (index) =>{  //remove a task
    const dataBase = getDataBase();

    dataBase.splice(index, 1);

    setDataBase(dataBase);

    updateScreen();
}

const updateItem = (index) =>{  //update status of a task
    const dataBase = getDataBase();

    
    dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
    
    setDataBase(dataBase);

    updateScreen();
}

document.getElementById('todoList').addEventListener('click', event =>{     //checks if the click is on the remove button or the checkbox then proceeds with wich it was.
    const element =  event.target;
    if(element.type === 'button'){
        
        removeItem(element.dataset.index); // get the index from html
    }
    else if(element.type === 'checkbox'){
        updateItem(element.dataset.index); // get the index from html
    }
})


updateScreen();