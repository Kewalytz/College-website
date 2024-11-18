const adminCredentials = {
    username: "admin",
    password: "password123@",
};

const users = [];
const timetable = [];

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const timetableForm = document.getElementById("timetable-form");

const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const adminDashboard = document.getElementById("admin-dashboard");
const userDashboard = document.getElementById("user-dashboard");

const timetableList = document.getElementById("timetable-list");
const userTimetableList = document.getElementById("user-timetable-list");

// Switch between login and register
document.getElementById("show-register").addEventListener("click", () => {
    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", () => {
    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

// Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        loginContainer.classList.add("hidden");
        adminDashboard.classList.remove("hidden");
    } else if (users.find((user) => user.username === username && user.password === password)) {
        loginContainer.classList.add("hidden");
        userDashboard.classList.remove("hidden");
        displayUserTimetable(username);
    } else {
        alert("Invalid credentials!");
    }
});

// Register
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (users.find((user) => user.username === username)) {
        alert("User already exists!");
    } else {
        users.push({ username, password });
        alert("Registration successful! You can now login.");
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    }
});

// Add Timetable (Admin)
timetableForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const className = document.getElementById("class-name").value;
    const startTime = document.getElementById("class-start-time").value;
    const endTime = document.getElementById("class-end-time").value;

    timetable.push({ className, startTime, endTime });
    displayAdminTimetable();
    alert("Class added successfully!");
    timetableForm.reset();
});

// Display Timetable (Admin)
function displayAdminTimetable() {
    timetableList.innerHTML = "";
    timetable.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${entry.className}: ${entry.startTime} to ${entry.endTime}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            timetable.splice(index, 1);
            displayAdminTimetable();
        });
        li.appendChild(deleteBtn);
        timetableList.appendChild(li);
    });
}

// Display Timetable (User)
function displayUserTimetable(username) {
    userTimetableList.innerHTML = "";
    timetable.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.className}: ${entry.startTime} to ${entry.endTime}`;
        userTimetableList.appendChild(li);
    });
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
    adminDashboard.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

document.getElementById("logout-user").addEventListener("click", () => {
    userDashboard.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

