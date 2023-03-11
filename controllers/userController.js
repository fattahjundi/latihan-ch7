const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const rahasia = 'rahasia'

function registerMember(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const rawData = {
        username: req.body.username,
        password: hashPassword,
        email: req.body.email
    }

    User.create(rawData)
    .then(result => {
        res.json({
            status: 200,
            message: 'berhasil register member',
            data: result
        })
    }).catch(err => res.json(err))
}

function registerAdmin(req, res) {
    const currentUser = req.user
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const rawData = {
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        role: 'admin'
    }

    User.findByPk(currentUser.id)
    .then(user => {
        console.log(user);
        if(user.role == 'super_admin') {
            User.create(rawData)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'berhasil register admin',
                    data: result
                })
            }).catch(err => res.json(err))
        }
        else {
            res.send(`Only 'super_admin' role allowed to register`)
        }
    }).catch(err => {
        res.json({
            status: 500,
            message: err
        })
    })
}

function login(req, res) {
    User.findOne({
        where: {username: req.body.username}
    }).then(user => {
        // jika user tidak ada
        if(!user) 
            return res.json({message: 'User not found!'})

        // jika user ada, cek password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordValid)
            return res.json({message: 'Wrong password!'})

        // jika user dan password valid
        const accessToken = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, rahasia)

        return res.json({
            id: user.id,
            username: user.username,
            accessToken: accessToken
        })
    })
}

const whoami = (req, res) => {
    const currentUser = req.user
    return res.json({
        id: currentUser.id,
        username: currentUser.username
    }).catch(err => {
        return res.json({
            status: 500,
            message: err
        })
    })
}

module.exports = {
    registerMember,
    registerAdmin,
    login,
    whoami
}