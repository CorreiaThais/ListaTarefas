const form = document.querySelector('#to-do-form')
const taskInput = document.querySelector('#task-input')
const list = document.querySelector('#to-do-list')

let tasks = []

function renderizarTaskHTML(taskTitle, done = false){      
    const li = document.createElement('li')

    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.addEventListener('change', (event) => {
        const liToggle = event.target.parentElement
        const spanToogle = liToggle.querySelector('span')
        const done = event.target.checked
        
        if(done === true){
            spanToogle.style.textDecoration = 'line-through'
        } else{
            spanToogle.style.textDecoration = 'none'
        }

        tasks = tasks.map(t => {
            if(t.title === spanToogle.textContent){
                return {
                    title: t.title,
                    done: !t.done,
                }
            } 

            return t
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
    input.checked = done    

    const span = document.createElement('span')
    span.textContent = taskTitle
    if(done) {span.style.textDecoration = 'line-through'}

    const button = document.createElement('button')
    button.textContent = 'X'
    button.addEventListener('click', (event) => {
        const liRemove = event.target.parentElement
        const titleRemove = liRemove.querySelector('span').textContent

        tasks = tasks.filter(t => t.title !== titleRemove)

        list.removeChild(liRemove)
        
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    list.appendChild(li)
}


window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')

    if(!tasksOnLocalStorage){
        return
    } else{
        tasks = JSON.parse(tasksOnLocalStorage)

        tasks.forEach(t => {
            renderizarTaskHTML(t.title, t.done)
        })
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskTitle = taskInput.value

    if(taskTitle.length < 3){
        alert('Sua tarefa precisa de pelo menos 3 caracteres.')
        return;
    }

    tasks.push({
        title: taskTitle,
        done: false,
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderizarTaskHTML(taskTitle)

    taskInput.value = ''
})

