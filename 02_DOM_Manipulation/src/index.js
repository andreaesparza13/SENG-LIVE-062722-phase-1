// Declare Functions
function renderHeader() {
    document.querySelector("h1").textContent = bookStore.name
}

function renderFooter() {
    const footerDivs = document.querySelectorAll("footer div")
    footerDivs[0].textContent = bookStore.name
    footerDivs[1].textContent = bookStore.address
    footerDivs[2].textContent = bookStore.hours
}

function createBook() {

}

const renderBook = book => {
    // Generate HTML Elements
    const li = document.createElement("li")
    const h3 = document.createElement("h3")
    const pAuthor = document.createElement("p")
    const pPrice = document.createElement("p")
    const img = document.createElement("img")
    const btn = document.createElement("button")

    // Fill HTML Elements
    h3.textContent = book.title
    pAuthor.textContent = book.author
    pPrice.textContent = `$${book.price.toFixed(2)}`
    img.src = book.imageUrl
    btn.textContent = "Delete Book"
    li.className = "list-li"

    // Generate Full <li> For Each Book
    li.append(h3, pAuthor, pPrice, img, btn)
    document.querySelector("#book-list").append(li)
}

// Invoke Functions
renderHeader()
renderFooter()

const books = bookStore.inventory.forEach(renderBook)