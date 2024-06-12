"use strict"

window.onload = () => {

    //get the create form off the page
    const createToDoForm = document.querySelector("#createTodoForm");

    //listen for the form submission and call createATodo
    createToDoForm.addEventListener("submit", createATodo)


}

//method/function to create a todo
//CRUD: (C)reate a todo
const createATodo = async (event) => {

    //call preventDefault to keep the page from reloading
    event.preventDefault();

    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a JavaScript Object from the formData object created above
    let formDataAsObject = Object.fromEntries(formData);

    //try catch for error handling
    try {

        //make a fetch (POST) request to create a comment in the API
        let response = await fetch("https://jsonplaceholder.typicode.com/todos",
            {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                //take the data from the form and build the body of the request
                body: JSON.stringify(formDataAsObject)
            }
        );
        //turn the response in to something we can work with
        let newTodo = await response.json();

        //put the comments in the console
        console.log(newTodo, "this should show up if I created a new todo")

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}