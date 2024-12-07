var siteName = document.getElementById("siteName");
var SiteURL = document.getElementById("SiteURL");
var bookbarklist = [];
if (localStorage.getItem("bookbarklist") != null) {
  bookbarklist = JSON.parse(localStorage.getItem("bookbarklist"));
  display(bookbarklist);
}

var regex = {
  siteName: {
    value: /^[A-Za-z]{3,8}/,
    isvalid: false,
  },
  SiteURL: {
    value:
      /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*))/,
    isvalid: false,
  },
};

function addBookmark() {
  console.log("hi");
  if (
    regex.siteName.isvalid &&
    regex.SiteURL.isvalid &&
    siteName.value &&
    SiteURL.value
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      SiteURL: SiteURL.value,
    };
    bookbarklist.push(bookmark);
    updateLocalStorage();
    display(bookbarklist);
    clear();
    siteName.classList.remove("is-valid");
    SiteURL.classList.remove("is-valid");
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: `Site name must contain at least 3 characters And
      Site URL must be a valid one`,
    });
  }
}

function display(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
              <td>${i + 1}</td>
              <td>${list[i].siteName}</td>
              <td>
                <button class="btn visit" onclick="visitUrl(${i})">
                  <i class="fa-solid fa-eye"></i>
                  Visit
                </button>
              </td>
              <td>
                <button class="btn delete" onclick="deleteBookmark(${i})">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>`;
  }
  document.getElementById("content").innerHTML = cartona;
}

function capitalize(s) {
  var stringArr = s.split("");
  stringArr[0] = stringArr[0].toUpperCase();
  return stringArr.join("");
}

function clear() {
  siteName.value = null;
  SiteURL.value = null;
}

function deleteBookmark(i) {
  bookbarklist.splice(i, 1);
  console.log(bookbarklist);
  updateLocalStorage();
  display(bookbarklist);
}

function updateLocalStorage() {
  localStorage.setItem("bookbarklist", JSON.stringify(bookbarklist));
}

function visitUrl(i) {
  console.log("hi");
  var urlRegex = /^https?:\/\//;
  if (urlRegex.test(bookbarklist[i].SiteURL)) {
    console.log("aa");
    open(bookbarklist[i].SiteURL);
  } else {
    console.log("gg");
    open(`https://${bookbarklist[i].SiteURL}`);
  }
}

function validateBookmarkInput(element) {
  if (regex[element.id].value.test(element.value) == true) {
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    regex[element.id].isvalid = true;
  } else {
    console.log("not match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    regex[element.id].isvalid = false;
  }
}
