//Declare Functions

//Demo querySelector
function renderHeader() {
    const header = document.querySelector("h1")
    header.textContent = bookStore.name
}

//Demo querySelectorAll
function renderFooter() {
    const footerDivs = document.querySelectorAll('footer div')
    //Bookstore Name
    footerDivs[0].textContent = bookStore.name
    //Bookstore Address
    footerDivs[1].textContent = bookStore.address
    //Bookstore Hours
    footerDivs[2].textContent = bookStore.hours
}

//Demo Create Elements
// function createBook() {

// }

function renderBook(book) {
        // Create the elements
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const pAuthor = document.createElement('p')
        const pPrice = document.createElement('p')
        const img = document.createElement('img')
        const btn = document.createElement('button')
        btn.addEventListener('click', e => {
            li.remove()
        })
    
        // Populate Elements
        h3.textContent = book.title
        pAuthor.textContent = book.author
        pPrice.textContent = book.price
        btn.textContent = "Delete Book"
        img.src = book.imageUrl
        li.className = 'list-li'
    
        li.append(h3, pAuthor, pPrice, img, btn)
        document.querySelector("#book-list").append(li)
    }


//Invoke Function
renderHeader()
renderFooter()

const books = bookStore.inventory
books.forEach(renderBook)
