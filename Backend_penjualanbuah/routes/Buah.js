const router = require('express').Router()
const buahController = require('../controller/Buah')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])

    const data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    buahController.insertBuah(data)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

    router.get('/getall', (req, res) => {
        buahController.getAllBuah()
       .then(result => res.json(result))
       .catch(err => res.json(err))
})

    router.get('/getbyid/:id', (req, res) => {
    buahController.getbyId(req.params.id)
       .then(result => res.json(result))
       .catch(err => res.json(err))
})

router.put('/edit/:id', fields,(req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])
    
    let data = JSON.parse(req.body.data)
    let changeImage = false
    if (imageName) {
        changeImage = true
        data = Object.assign(data, {
            image: imageName,
            oldImage: data.image
        })
    }

    buahController.editBuah(data, req.params.id, changeImage)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
    buahController.delete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = router