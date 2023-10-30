
document.addEventListener("DOMContentLoaded", () => {

    // Function to populate page from the start
    function loadPage(store) {
        renderHeader(store)
        renderFooter(store)
        renderBookList(store)
    }

    // Initial Page Load with Store 1
    loadPage(bookStore)

    function renderBookList(store) {
        // store.inventory.forEach(bookCard => renderBookCard(bookCard))
        store.inventory.forEach(renderBookCard)
    }
    
    function clearBookList() {
        document.querySelectorAll('li').forEach(li => li.remove())
    }
    
    let toggleSwitch = false

    function switchStore() {
        toggleSwitch = !toggleSwitch
        if (!toggleSwitch) {
            clearBookList()
            loadPage(secondBookStore)
        } else {
            clearBookList()
            loadPage(bookStore)
        }
    }

    // Activate switch toggle button
    document.querySelector("#switch-btn").addEventListener("click", switchStore)

    // Form Submit Button Handling
    document.querySelector("#book-form").addEventListener("submit", e => handleForm(e))

    // Renders Header
    function renderHeader(store){
        document.querySelector('h1').textContent = store.name
    }

    // Renders Footer
    function renderFooter(store){
        const footerDivs = document.querySelectorAll('footer div')
        footerDivs[0].textContent = store.name
        footerDivs[1].textContent = store.address
        footerDivs[2].textContent = store.hours
    }

    function renderBookCard(cardData) {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const pAuthor = document.createElement('p')
        const pPrice = document.createElement('p')
        const img = document.createElement('img')
        const btn = document.createElement('button')

        h3.textContent = cardData.title
        pAuthor.textContent = cardData.author
        pPrice.textContent = `$${cardData.price}`
        btn.textContent = 'Delete'
        // btn.addEventListener('click', e => e.target.parentElement.remove())
        btn.addEventListener('click', () => li.remove())

        img.src = cardData.imageUrl
        li.className = 'list-li'

        li.append(h3,pAuthor,pPrice,img,btn)
        document.querySelector('#book-list').append(li)
    }

    function handleForm(e) {
        e.preventDefault()

        // Build book object
        const book = {
            id: bookStore.inventory.length + 1,
            title: e.target.title.value,
            author: e.target.author.value,
            price: e.target.price.value,
            reviews: [],
            inventory: e.target.inventory.value,
            imageUrl: e.target.imageUrl.value
        }

        // Add book to inventory list
        bookStore.inventory.push(book)

        // Final step to add the newly created card
        renderBookCard(book)
    }
})