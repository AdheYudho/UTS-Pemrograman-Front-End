let todos = [];

const homePage = document.getElementById('home-page');
const addPage = document.getElementById('add-page');
const fabBtn = document.getElementById('add-btn');
const pageTitle = document.getElementById('page-title');

function showAddPage() {
    homePage.classList.remove('active');
    addPage.classList.add('active');
    
    fabBtn.style.display = 'none';
    
    pageTitle.innerText = "Tambah Tugas Baru";

    document.getElementById('input-title').value = '';
    document.getElementById('input-title').focus();
}

function showHomePage() {
    addPage.classList.remove('active');
    homePage.classList.add('active');
    
    fabBtn.style.display = 'flex';
    
    pageTitle.innerText = "Daftar Tugas";
    
    renderTodos(); 
}




function loadTodos() {
    const storedTodos = localStorage.getItem('myTodos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}


function saveToLocalStorage() {
    localStorage.setItem('myTodos', JSON.stringify(todos));
}


function renderTodos() {
    const listContainer = document.getElementById('todo-list');
    const emptyMsg = document.getElementById('empty-msg');
    
    listContainer.innerHTML = ''; 

    if (todos.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        
        todos.forEach((todo, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            itemDiv.innerHTML = `
                <div class="todo-content" onclick="toggleComplete(${index})">
                    <div class="checkbox"></div>
                    <div>
                        <div class="todo-text">${escapeHtml(todo.title)}</div>
                        <small style="color: #999; font-size: 0.8rem">${todo.category}</small>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteTodo(${index})">
                    &times;
                </button>
            `;
            listContainer.appendChild(itemDiv);
        });
    }
}


function saveTodo() {
    const titleInput = document.getElementById('input-title');
    const categoryInput = document.getElementById('input-category');
    
    const title = titleInput.value.trim();
    const category = categoryInput.value;

    if (title === '') {
        const originalPlaceholder = titleInput.placeholder;
        titleInput.placeholder = "Judul tidak boleh kosong!";
        titleInput.style.borderColor = "red";
        setTimeout(() => {
            titleInput.placeholder = originalPlaceholder;
            titleInput.style.borderColor = "#ddd";
        }, 1500);
        return;
    }

    const newTodo = {
        id: Date.now(),
        title: title,
        category: category,
        completed: false
    };

    todos.push(newTodo);
    saveToLocalStorage();
    showHomePage();
}


function deleteTodo(index) {
    if(confirm('Hapus tugas ini?')) {
        todos.splice(index, 1);
        saveToLocalStorage();
        renderTodos();
    }
}


function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveToLocalStorage();
    renderTodos();
}


function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


window.onload = loadTodos;