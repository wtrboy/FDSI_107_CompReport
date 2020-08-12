/*
    use AJAX to communicate between front and back ends: 
    "Async JavaScript and XML"
    use JSON instead of XML generally
    Create the AJAX request to this URL : http://restclass.azurewebsites.net,
    this is our back-end server. 
    HTTP verbs (request methods): 
    GET: get info (cannot send data, only to recieve data from server);
    POST: create/send data (create items),
    PUT: update some existing element (whole object),
    PATCH: update part of an existing element (pieces of the object),
    DELETE: remove an existing element,
*/

//use an object constructor function here (this new object contains all of the below, I want to put a user in this new object) ->

function Item(code, title, price, cat, image) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.category = cat;
    this.image = image;
    this.user = 'Lane';
}

function register() { // all this needs to be sent via an AJAX request
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var cat = $("#txtCategory").val();
    var image = $("#txtImage").val();
    console.log(price);
    var item = new Item(code, title, price, cat, image);
    console.log(item);
    console.log(JSON.stringify(item));

    
    //create the AJAX request

    $.ajax({
        url: 'http://localhost:8080/api/items',
        type: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function(response) {
            console.log("Yes!", response);
        },
        error: function(errorDetails) {
            console.log("Bummer!",errorDetails);
        }
    });

}



function init(){
    //hook events
    $("#btnSave").click(register);
    // load data
}



window.onload = init;
