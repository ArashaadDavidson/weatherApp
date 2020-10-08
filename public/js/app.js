console.log('yps')



const form = document.querySelector('.form1')
const search = document.querySelector('input')
let p1 = document.querySelector('.p1')
let p2 = document.querySelector('.p2')
let p3 = document.querySelector('.p3')
let p4 = document.querySelector('.p4')
let p5 = document.querySelector('.p5')
let p6 = document.querySelector('.p6')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    p1.textContent = 'Loading...'
    p1.textContent = ''
    p2.textContent = ''
    p3.textContent = ''
    p4.textContent = ''
    p5.textContent = ''
    p6.textContent = '' 
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1.textContent = 'Error: '+data.error
        }else{
            p1.textContent = 'Place: '+data.Place
            p2.textContent = 'Latitude: '+data.Latitude
            p3.textContent = 'Longitude: '+data.Longitude
            p4.textContent = 'Weather Description: '+data.weather_description
            p5.textContent = 'Temperature: '+data.temperature
            p6.textContent = `'Feels like' Temperature: ${data.feelslike}`
        }
    })
})
})
