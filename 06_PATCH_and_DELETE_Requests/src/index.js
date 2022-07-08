document.addEventListener('DOMContentLoaded', () => {
    // Fetch requests 
        // Function for making a GET request aka pulling a resource
        function fetchResource(url){
            return fetch(url)
            .then(res => res.json())
        }

        // fetchResource() => 
            // return a promise (status: fulfilled, pending, rejected)
            // return the contents of the promise (stores, books)

        // Function for making a POST request aka creating a resource
        function createResource(url, body){
            return fetch(url,{
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            .then(res => res.json())
        }

        // Function for making a DELETE request aka removing a resource
        function deleteResource(url) {
            return fetch(url, {
                // HTTP method
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
        }

        function handleDelete(id, target) {
            deleteResource(`http://localhost:3000/books/${id}`)
            .then(() => target.remove())
            .catch(e => console.error(e))
        }

        // Function for making a PATCH request aka updating a resource
        function updateResource(url, body) {
            return fetch(url,{
                method: 'PATCH', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            .then(res => res.json())
        }

        function handleUpdate(id, val) {
            updateResource(`http://localhost:3000/books/${id}`, {inventory: val})
            // .then(() => res.json())
            .catch(e => console.error(e))
        }

    // Rendering functions
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
            const inventory = document.createElement('input')
    
            h3.textContent = cardData.title
            pAuthor.textContent = cardData.author
            pPrice.textContent = `$${cardData.price}`
            btn.textContent = 'Delete'
    
            img.src = cardData.imageUrl
            li.className = 'list-li'
            inventory.type = 'number'
            inventory.value = cardData.inventory
    
            //Event Listeners 
            // Optimistic rendering => making direct changes to DOM without server confirmation
            // btn.addEventListener('click',()=>li.remove())
            btn.addEventListener('click', (e) => handleDelete(cardData.id, e.target.parentElement.remove()))
            inventory.addEventListener('change', (e) => handleUpdate(cardData.id, e.target.value))

        
            li.append(h3,pAuthor,pPrice,img,inventory,btn)
            document.querySelector('#book-list').append(li)
        }
    
    // Event Handlers
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
            createResource('http://localhost:3000/books', book)
            .then(renderBookCard)
            .catch(e => console.error(e))

        }
    
    
    // Invoking functions    
        fetchResource('http://localhost:3000/stores/1')
        .then(store => {
            renderHeader(store)
            renderFooter(store)
        })
        .catch(e => console.error(e))
    
        fetchResource('http://localhost:3000/books')
        .then(books => books.forEach(renderBookCard))
        .catch(e => console.error(e))
    
        document.querySelector('#book-form').addEventListener('submit', handleForm)
    
})