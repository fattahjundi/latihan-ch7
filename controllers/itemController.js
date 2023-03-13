const { Item, User } = require('../models/index')
const { resJSON } = require('../helper/response')

function insertItem(req, res) {
    const rawData = {
        namaItem: req.body.namaItem,
        jenisItem: req.body.jenisItem,
        hargaItem: +req.body.hargaItem
    }

    const currentUser = req.user
    User.findByPk(currentUser.id)
    .then(user => {
        if(user.role == 'admin') {
            Item.create(rawData)
            .then(result => {
                resJSON.status = 200
                resJSON.message = 'berhasil insert item'
                resJSON.data = result
                res.json(resJSON)
            }).catch(err => {
                resJSON.status = 500
                resJSON.message = 'gagal insert item'
                resJSON.data = err
                res.json(resJSON)
            })
        }
        else {
            res.send(`Only 'admin' role allowed to insert item`)
        }
    }).catch(err => {
        res.json({
            status: 500,
            message: err
        })
    })

    
}

module.exports = {
    insertItem
}