"use strict"

window.onload = () => {

        //get the getTodo form off the page
        const getTodoForm = document.querySelector("#getTodoToEdit");

        //listen for submit of the getCommentForm and attempt to populate the update form
        getTodoForm.addEventListener("submit", populateUpdateForm);
    
        //get the updateComment form off the page
        const updateTodoForm = document.querySelector("#updateTodoForm");
    
        //listen for submit of the getCommentForm and attempt to populate the update form
        updateTodoForm.addEventListener("submit", updateATodo);

        const cancelButton = document.querySelector("#cancelButton");

        cancelButton.addEventListener("click", cancelEdit)
}

const cancelEdit = () => {

    //redirect folks back to the homepage
    let answer = confirm("Do you really want to cancel this edit?");
    if(answer) {
        window.location.href = "./index.html";
    }
}


const populateUpdateForm = async (event) => {
    event.preventDefault();

    //go get the single comment for the id the user selected
    let todo = await getSingleTodo(event.target.todoId.value);

    //fill out the form with the data from the comment we just got from the API
    document.querySelector("#userId").value = todo.userId;
    document.querySelector("#title").value = todo.title;
    document.querySelector("#completed").value = todo.completed;
    document.querySelector("#id").value = todo.id;

}

const getSingleTodo = async (todoId) => {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + todoId);
    let todo = await response.json();

    return todo;

}

//method/function to update a todo
//CRUD: (U)pdate a comment
const updateATodo = async (event) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (PUT) request to update a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/" + event.target.id.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    userId: event.target.userId.value,
                    title: event.target.title.value,
                    completed: event.target.completed.value
                })
            }
        );
        //turn those comments in to something we can work with
        let updatedTodo = await response.json();

        //put the comments in the console
        console.log(updatedTodo)

    } catch (err) {

        //what the hell happend
        console.log("something went south", err)

    }

}