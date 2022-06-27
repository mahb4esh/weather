console.log('script loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const value = search.value
    const url = 'http://localhost:3000/weather?search=' + value

    messageOne.textContent = 'Loading content'
    messageTwo.textContent = ''

 
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {

                console.log(data)
                messageOne.textContent = data.location
                const msg2 = data.weather + '. ' + 'Temp is ' + ' '+ data.cur_temp + ' ' + 'Feels like ' + data.feel_temp
                messageTwo.textContent = msg2

            }
        
        })
    })
})