var catalog = [];
var categories = [];

function fetchData() {
    //get data from a server
    $.ajax({
        url: 'http://localhost:8080/api/items/Lane',
        type: 'GET',
        success: function (allItems) {
            // travel allItems
            // check if the item belong to me
            // if so, push it to catalogue array

            for (let i = 0; i < allItems.length; i++) {
                var item = allItems[i];
                //if (item.user === "Lane") {
                    catalog.push(item);

                    //** if array does not contain category, add the category */
                    //* also solution: if(categories.indexOf(item.category))

                    if (categories.indexOf(item.category) == -1) {
                        categories.push(item.category);
                    }
             //   }
            }

            displayCatalog();
            displayCategories();
        },
        error: function (details) {
            console.error("Error getting data", details);
        }
    });
}

function displayCategories() {
    // travel the categories array
    for (let i = 0; i < categories.length; i++) {
        var cat = categories[i];



        // get each cat
        // create syntax for li

        var syntax = `<li onclick="search('${cat}')" class="list-group-item list-group-item-action">${cat}</li>`


        // append the syntax to #categories

        $("#categories").append(syntax);
    }
}

// <li onclick="search('coding')">

function displayCatalog() {
    // travel the array of items using a FOR loop
    // get each item
    // display the item on HTML

    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];


    }
}

function displayItem(item) {
    //display items on html
    var syntax =
        `<div class="item">
            <img src="${item.image}">
            <div class="info">
                <label class="code">${item.code}</label>
                <label class="title">${item.title}</label>
                <label class="price">$ ${item.price}</label>

                <button class="btn btn-info btn-sm">Add</button>
                <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Delete</button>
            </div>
        </div>`;

    $("#catalog-container").append(syntax);
}

function search(text) {
   // 

    // clear previous results

    $("#catalog-container").html('');

    // travel array again

    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];

        // get each item
        // if the item title contains text, OR the category contains the text, OR the code contains the text, display the item

        if (item.title.toLowerCase().includes(text.toLowerCase()) 
        || item.category.toLowerCase().includes(text.toLowerCase()) 
        || item.code.toLowerCase().includes(text.toLowerCase()) ){
            displayItem(item);
        }
    }
}

function deleteItem(id) {
    $.ajax({
        url: '/api/items',
        type: 'DELETE',
        data: JSON.stringify({id: id}),
        contentType:'application/json',
        success: (res) => {
            console.log("Item removed!")
            console.log("Server says ", res);
        },
        error: (errDetails) => {
            console.log("Could not be deleted");
            console.log("Error", errDetails);
        }
    });
}


function init() {
    console.log("Catalog Working!");
    // hook events
    $("#btnSearch").click(function() {
        var text = $("#txtSearch").val();
        search(text);
    });

    // load data/settings

    fetchData();

}




window.onload = init;

/*
    code
    title
    price
    imageURL
    quantity
    category

*/

// TODO: 1, clear the capture form after saving 2, show a message showing "success" (use bootstrap) 3 (optional), sort items lowest price first; must work on styling of page!!