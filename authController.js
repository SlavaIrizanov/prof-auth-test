const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
//здесь все функции по взаимодействию с юзером, т.е. регистрацию авторизацию иполучение пользователей
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "registration error- not valid", errors})
            }
            const {username, password} = req.body //деструктуризация для логина и пароля 
            // проверяем если такой юзер с такми же некнеймом
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User with the same name already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7) // хешируем пароль
            const userRole = await Role.findOne({value: "USER"}) //достаем роль из БД
            const user = new User({username, password: hashPassword, roles: [userRole.value]}) // создали юзера
            await user.save()
            return res.json({message: "User successfully registered"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    
    async getUsers(req, res) {
        try {
            //code ниже - костыль чтобы создать роли в БД, но чтобы сократить время, не создаем отдельные ендпоинты
            // const userRole = new Role()
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            // использовали 1 раз
            res.json("Server Work")
        } catch (e) {

        }
    }
}

// 2 параметра req - запрос и res - ответ
module.exports = new authController