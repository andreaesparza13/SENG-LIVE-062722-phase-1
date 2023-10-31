document.addEventListener('DOMContentLoaded', () => {
    
    const storeMenu = document.createElement("ul")
    storeMenu.className = "store-menu"

    let storeList = []

    function fetchAllStores() {
        fetch('http://localhost:3000/stores')
        .then(res => res.json())
        .then(store => storeList.push(store))
    }
    fetchAllStores()

    function fetchEachStore(id){
        // Fetch Request
        // Creates a "promise"
        fetch(`http://localhost:3000/stores/${id}`)
        // Once promise is resolved...
        .then(res => res.json())  // this method parses json into JavaScript
        .then(store => {
            renderHeader(store)
            renderFooter(store)
        })
    }
// Render Functions
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

        img.src = cardData.imageUrl
        li.className = 'list-li'

        //Event Listeners 
        btn.addEventListener('click',()=>li.remove())
    
        li.append(h3,pAuthor,pPrice,img,btn)
        document.querySelector('#book-list').append(li)
    }

// Event handlers 
    function handleForm(e){
        e.preventDefault()
        //Builds Book
        const book = {
            title: e.target.title.value,
            author:e.target.author.value,
            price: e.target.price.value,
            imageUrl: e.target.imageUrl.value,
            inventory:e.target.inventory.value,
            reviews:[]
        }
        renderBookCard(book)
    }

//Invoking functions
    renderHeader(bookStore)
    renderFooter(bookStore)
    bookStore.inventory.forEach(renderBookCard)
    document.querySelector('#book-form').addEventListener('submit', handleForm)


})