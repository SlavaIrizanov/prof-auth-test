const express = require('express') //Эта строка импортирует библиотеку express. Библиотека express предоставляет набор инструментов для создания веб-приложений на Node.js.
const mongoose = require('mongoose')
const authRouter = require('./authRouter') //путь чтобы прослушивал роутер
const PORT = process.env.PORT || 4000 
// Эта строка определяет переменную PORT, которая содержит номер порта, на котором будет запущен сервер. или из системных переменых или если пустая то 4000 порт

const app = express()
//Эта строка создает экземпляр приложения express. Приложение express представляет собой объект, который предоставляет методы для обработки запросов от клиентов.
app.use(express.json()) //чтобы vju парсить json, который будет прилеать в запросах
app.use("/auth", authRouter) //первый параметр по которому слушается, урл 2-ое сам роутер

//функция которая запускает наш сервер
const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://veaceslavunifun:YgwlamX1aQlaJkyX@cluster0.7rml3nz.mongodb.net/auth_roles?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()