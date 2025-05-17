const search = document.querySelector("input");
const form = document.querySelector("form");
const searchResult = document.querySelector(".results");
const errorMsg = document.querySelector(".alert");
const line = document.querySelector("hr");
const loader = document.getElementById("loader");
const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchvalue = search.value.trim();

  if (searchvalue === "") {
    return errorMessage("Search cannot be empty. Please enter a search term.");
  }

  getResult(searchvalue);
});

async function getResult(searchval) {
  showLoader(true);
  errorMsg.classList.add("hide");
  searchResult.innerHTML = "";

  try {
    const response = await fetch(apiURL + searchval);
    const results = await response.json();

    if (results.query.search.length === 0) {
      return errorMessage("Invalid search, please enter another search term.");
    } else {
      displayData(results);
    }
  } catch (err) {
    errorMessage("Something went wrong. Please try again.");
  } finally {
    showLoader(false);
  }
}

// Show/hide loader
function showLoader(show) {
  if (show) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
}

// Show error
function errorMessage(msg) {
  showLoader(false);
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hide");
  errorMsg.style.display = "block";
  line.classList.add("show");
}

// Show results
function displayData(results) {
  line.classList.add("show");
  let output = "";

  results.query.search.forEach((result) => {
    const resultURL = `https://en.wikipedia.org/?curid=${result.pageid}`;
    output += `
      <div class="result p-1">
        <a href="${resultURL}" target="_blank" class="h3 fw-bold">${result.title}</a><br/>
        <a href="${resultURL}" target="_blank" class="fs-5 text-success">${resultURL}</a>
        <p class="fs-5">${result.snippet}...</p>
      </div>`;
  });

  searchResult.innerHTML = output;
}