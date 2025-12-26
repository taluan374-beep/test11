// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    updateTaskCount();
});

// Event Listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Functions
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        todoInput.classList.add('shake');
        setTimeout(() => todoInput.classList.remove('shake'), 500);
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.unshift(todo);
    saveTodos();
    renderTodos();
    updateTaskCount();
    
    todoInput.value = '';
    todoInput.focus();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
    updateTaskCount();
}

function deleteTodo(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    todoElement.style.animation = 'slideOut 0.3s ease forwards';
    
    setTimeout(() => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
        updateTaskCount();
    }, 300);
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
    updateTaskCount();
}

function getFilteredTodos() {
    switch (currentFilter) {
        case 'pending':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <span>📋</span>
                <p>${getEmptyMessage()}</p>
            </div>
        `;
        return;
    }
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="checkbox" onclick="toggleTodo(${todo.id})"></div>
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">×</button>
        </li>
    `).join('');
}

function getEmptyMessage() {
    switch (currentFilter) {
        case 'pending':
            return 'Không có công việc chưa hoàn thành!';
        case 'completed':
            return 'Chưa có công việc hoàn thành!';
        default:
            return 'Thêm công việc đầu tiên của bạn!';
    }
}

function updateTaskCount() {
    const pendingCount = todos.filter(todo => !todo.completed).length;
    const totalCount = todos.length;
    
    if (totalCount === 0) {
        taskCount.textContent = '0 công việc';
    } else {
        taskCount.textContent = `${pendingCount} chưa xong / ${totalCount} tổng`;
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add shake animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .shake {
        animation: shake 0.3s ease;
        border-color: #ff6b6b !important;
    }
`;
document.head.appendChild(style);
