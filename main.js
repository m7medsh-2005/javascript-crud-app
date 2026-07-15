let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");

let mood = "create";
let tmp;


// get total
function getTotal(){
    if(price.value != ""){
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#080";
    }else{
        total.innerHTML = "";
        total.style.background = "#9a031f";
    }
}

// create Html
function createHtml(product , i){
    return `
        <tr>
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="updateEle(${i})" id="update">Update</button></td>
            <td><button onclick="deleteEle(${i})" id="delete">Delete</button></td>
        </tr>
    `;
}

// create 

let dataPro;

// keep element
if(localStorage.getItem("product") !== null){
    dataPro = JSON.parse(localStorage.getItem("product"));
}else{
    dataPro = [];
}

submit.addEventListener("click" , function(){
    let objPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if(title.value !== ""
        && price.value !== ""
        && count.value < 100
        && category.value !== ""
    ){
        
        if(mood === "create"){
            
            if(count.value > 1){
    
                for(let i = 0 ; i < count.value ; i++){
                dataPro.push(objPro);
                }
    
            }else{
                dataPro.push(objPro);
            }
            
        }else{
            dataPro[tmp] = objPro;
            count.style.display = "block";
            submit.innerHTML = "Create";
            mood = "create";
        }
        clearInput();
    }

    localStorage.setItem("product" , JSON.stringify(dataPro));

    show();
});

// clear input
function clearInput(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.background = "#9a031f"
    count.value = "";
    category.value = "";
}

// Read 
function show(){
    let table = "";
    for(let i = 0; i < dataPro.length; i++){
        table += createHtml(dataPro[i] , i);
    }

    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");

    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }else{
        btnDelete.innerHTML = "";
    }
}
show();

// delete
function deleteEle(i){
    dataPro.splice(i , 1);
    localStorage.product = JSON.stringify(dataPro);
    show();
}

function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    show();
}

// update 
function updateEle(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = "none";
    getTotal();
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// search 
let searchMood = "title";
function getSearchMode(id){
    if(id === "searchTitle"){
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    search.placeholder = `Seach by ${searchMood}`;
    search.focus();
    search.value = "";
    show();
}

function getSearch(value){
    let table = "";
    for(let i = 0; i < dataPro.length; i++){
        if(searchMood === "title"){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += createHtml(dataPro[i], i);
            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += createHtml(dataPro[i] , i);
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}