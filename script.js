const fullName = "Гаврилюк Мар'ян";

function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function showGreeting(fullName, age) {
    document.getElementById("out1").innerHTML =
        `<p>Hello, ${fullName}! You are ${age} years old.</p>`;
}

function task1() {
    const firstName = prompt("Введіть ім'я:");
    const lastName  = prompt("Введіть прізвище:");
    const age       = prompt("Введіть вік:");
    const name = getFullName(firstName, lastName);
    showGreeting(name, age);
}

function getStudentInfo() {
    const name  = prompt("Введіть ім'я студента:");
    const score = parseInt(prompt("Введіть бал (0-12):"));
    return { name, score };
}

function checkGrade(score) {
    if (score >= 10 && score <= 12) return "Excellent";
    if (score >= 7)  return "Good";
    if (score >= 4)  return "Satisfactory";
    if (score >= 0)  return "Fail";
    return "Invalid score";
}

function showResult2(name, grade) {
    document.getElementById("out2").innerHTML =
        `<p>Student: ${name}<br>Grade: ${grade}</p>`;
}

function task2() {
    const info  = getStudentInfo();
    const grade = (isNaN(info.score) || info.score > 12)
        ? "Invalid score"
        : checkGrade(info.score);
    showResult2(info.name, grade);
}

function calculateTip(amount, percent = 10) {
    return amount * percent / 100;
}

function showResult3(amount, tip, percent = 10) {
    document.getElementById("out3").innerHTML =
        `<p>Bill: ${amount} грн<br>` +
        `Tip (${percent}%): ${tip} грн<br>` +
        `Total: ${amount + tip} грн</p>`;
}

function task3() {
    const amount = parseFloat(prompt("Введіть суму рахунку (грн):"));
    if (isNaN(amount)) return;
    const tip = calculateTip(amount);   
    showResult3(amount, tip);
}

function startGreetingTimer(message, seconds, callback) {
    setTimeout(() => {
        document.getElementById("out4").innerHTML = `<p>${message}</p>`;
        callback();
    }, seconds * 1000);
}

function task4() {
    document.getElementById("out4").innerHTML = "<p><i>Зачекайте 3 секунди...</i></p>";

    startGreetingTimer(`Hello, ${fullName}!`, 3, () => alert("Time is up!"));
}

function calculate(a, b, operation) {
    switch (operation) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default:  return "Invalid operation";
    }
}

function showResult5() {
    const a = parseFloat(prompt("Введіть перше число:"));
    const b = parseFloat(prompt("Введіть друге число:"));
    const op = prompt("Введіть операцію (+, -, *, /):");
    const result = calculate(a, b, op);
    alert(`Результат: ${result}`);
    document.getElementById("out5").innerHTML = `<p>Результат: ${result}</p>`;
}

function task5() {
    showResult5();
}

function createClickCounter() {
    let count = 0;
    return function () {
        count++;
        console.log(`Count: ${count}`);
        return count;
    };
}

function task6() {
    const counter = createClickCounter();
    let html = "";
    for (let i = 0; i < 3; i++) {
        html += `<p>Виклик ${i + 1}: Count = ${counter()}</p>`;
    }
    document.getElementById("out6").innerHTML = html;
}

function* randomGenerator(min, max) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

let randomGen = null;

function task7() {
    const min = parseInt(prompt("Введіть мінімальне значення:"));
    const max = parseInt(prompt("Введіть максимальне значення:"));
    if (isNaN(min) || isNaN(max) || min > max) {
        alert("Некоректні межі!");
        return;
    }
    randomGen = randomGenerator(min, max);
    document.getElementById("out").textContent = `Межі: ${min}–${max}. Натисніть Next.`;
}

document.getElementById("next").addEventListener("click", () => {
    if (!randomGen) {
        document.getElementById("out").textContent = "Спочатку задайте межі.";
        return;
    }
    document.getElementById("out").textContent = randomGen.next().value;
});

function* passwordGenerator() {
    let password = "";
    while (true) {
        const ch = yield;       
        if (ch === "done") return password;
        password += ch;
    }
}

function task8() {
    const gen = passwordGenerator();
    gen.next();                     
    let result;
    while (true) {
        const input = prompt("Введіть символ (або 'done' для завершення):");
        result = gen.next(input === null ? "done" : input);
        if (result.done) break;
    }
    document.getElementById("out8").innerHTML =
        `<p>Ваш пароль: <b></b></p>`;
    document.querySelector("#out8 b").textContent = result.value;
}

function* chatBot() {
    const name = yield "Hi! What is your name?";
    const mood = yield `Nice to meet you, ${name}! How are you?`;
    yield "Goodbye!";
    return { name, mood };
}

function task9() {
    const out = document.getElementById("out9");
    out.innerHTML = "";
    const addLine = (who, text) => {
        const p = document.createElement("p");
        p.textContent = `${who}: ${text}`;
        out.appendChild(p);
    };

    const bot = chatBot();
    let step = bot.next();
    while (!step.done) {
        const question = step.value;
        addLine("Bot", question);
        if (question === "Goodbye!") {
            alert(question);
            step = bot.next();
        } else {
            const answer = prompt(question);
            addLine("You", answer);
            step = bot.next(answer);
        }
    }
}

function task10() {
    const userName = prompt("Введіть ім'я:");
    const user = {
        name: userName,
        say() { alert(`Hello, ${this.name}`); }
    };

    document.getElementById("helloBad").onclick = user.say;

    document.getElementById("hello").onclick = user.say.bind(user);

    document.getElementById("out10").innerHTML =
        "<p>При простому присвоєнні <code>button.onclick = user.say</code> метод викликається " +
        "як обробник кнопки, тому <code>this</code> вказує на кнопку, а не на <code>user</code>, " +
        "і ім'я втрачається. Рішення: <code>user.say.bind(user)</code> — " +
        "<code>this</code> завжди буде об'єктом <code>user</code>.</p>";
}