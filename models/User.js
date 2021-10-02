const bcrypt = require ('bcryptjs')
const usersCollection = require ('../db').db().collection('users')
const validator = require('validator');

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    if (typeof(this.data.login) !== 'string') { this.data.login = '' }
    if (typeof(this.data.mail) !== 'string') { this.data.mail = '' }
    if (typeof(this.data.password) !== 'string') { this.data.password = '' }

    //
    this.data = {
        login: this.data.login.trim().toLowerCase(),
        mail: this.data.mail.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if (this.data.login === '') { this.errors.push('You must provide a name') }
        if (this.data.login !== '' && !validator.isAlphanumeric(this.data.login)) { this.errors.push('Name can only contain alphanumeric characters') }
        if (!validator.isEmail(this.data.mail)) { this.errors.push('You must provide a valid email') }
        if (this.data.password === '') { this.errors.push('You must provide a password') }
        if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push('Your password must be at least 12 characters') }
        if (this.data.password.length > 50) { this.errors.push('Password cannot exceed 50 characters') }
        if (this.data.login.length > 0 && this.data.login.length < 3) { this.errors.push('Your name must be at least 3 characters') }
        if (this.data.login.length > 30) { this.errors.push('Your cannot exceed 30 characters') }

        // If username is valid then check if it's already taken
        if (this.data.login.length > 2 && this.data.login.length < 31 && validator.isAlphanumeric(this.data.login)) {
            let usernameExists = await usersCollection.findOne({ login: this.data.login })
            if (usernameExists) {this.errors.push('Username already taken')}
        }

        // If email is valid then check if it's already taken
        if (validator.isEmail(this.data.mail)) {
            let emailExists = await usersCollection.findOne({ mail: this.data.mail})
            if (emailExists) {this.errors.push('Email already being used')}
        }
        resolve()
    })
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({ login: this.data.login}).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                resolve("congrats!!!!")
            } else {
                reject('invalid username/password')
            }
        }).catch(() => {
            reject('Please try again later')
        })
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        // Validate user data
        this.cleanUp()
        await this.validate()

        // If no validation errors
        if (!this.errors.length) {
            // hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        } else {
            reject(this.errors)
        }
    })
}
module.exports = User