const form = document.querySelector("form");
const searchResult = document.querySelector(".results");
const errorMsg = document.querySelector(".alert");
const line = document.querySelector("hr");
const apiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let searchvalue = search.value;

    if(searchvalue === ""){
        errorMsg("Search cannot be empty. Please enter a search tearm.");
    }
    else{
        getResult(searchvalue)
    }
})