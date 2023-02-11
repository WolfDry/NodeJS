const postsList = document.getElementById('posts')

/**
 * Permet l'affichage du post sur la page d'accueil
 ** @param {string} post
 */
function addPost (post) {
    const div = document.createElement('div')
    div.id = 'post'
    const content = document.createElement('p')
    content.innerHTML = post
    const date = document.createElement('span')
    const elementDate = new Date()
    date.innerHTML = elementDate.toLocaleString()
    div.appendChild(content)
    div.appendChild(date)
    postsList.prepend(div)
}

let ws

/**
 * Permet la connexion avec le webSocket
 */
function connect () {
    ws = new WebSocket('ws://localhost:3000/wsPosts')
    ws.onopen = () => {
        console.log('Connected')
    }

    ws.onclose = () => {
        console.log('Disconnected')
        setTimeout(connect, 1000)
    }

    ws.onerror = (error) => {
        console.log('Error', error)
    }

    ws.onmessage = (event) => {
        console.log('Message from server', event.data)
        const { type, data } = JSON.parse(event.data)
        console.log(data)
        if (type === 'post') {
            addPost(
                data
            )
        }
    }
}

connect()

document.querySelector('form')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        const input = document
            .querySelector('#post-input')
        ws.send(input.value)
        const value = input.value
        input.value = ''

        const donnee = {
            content: value
        }

        // On vient faire une requête afin d'ajouter le post dans la base de données
        // eslint-disable-next-line no-undef
        $.ajax({
            type: 'POST',
            url: '/',
            data: donnee,
            dataType: 'json'
        })
    })
