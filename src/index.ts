// main.ts

// Типизация переменной
const message: string = 'Hello from TypeScript!';

// Типизация функции
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Интерфейс
interface User {
    id: number;
    username: string;
}

// Использование интерфейса
const user: User = {
    id: 1,
    username: 'coder123'
};

// Вывод
console.log(message);
console.log(greet(user.username));
