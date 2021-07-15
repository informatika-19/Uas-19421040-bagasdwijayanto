const buahModel = require ('../model/Buah')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertBuah = (data) =>
  new Promise((resolve, reject) => {
    buahModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Buah')))
    .catch(() => reject(requestResponse.serverError))
  })

  exports.getAllBuah = () =>
    new Promise((resolve, reject) => {
      buahModel.find({})
           .then(buah => resolve(requestResponse.suksesWithData(buah)))
           .catch(error => resolve(requestResponse.serverError))
    })

    exports.getbyId = (id) =>
      new Promise((resolve, reject) => {
        buahModel.findOne({
              _id: objectId(id)
          }).then(buah => resolve(requestResponse.suksesWithData(buah)))
          .catch(error => reject(requestResponse.serverError))
      })

exports.editBuah = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    buahModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Daftar Buah'))
      }).catch(() => reject(requestResponse.serverError))
  })

  exports.delete = (id) =>
    new Promise((resolve, reject) => {
      buahModel.findOne({
        _id: objectId(id)
      }).then(buah => {
        buahModel.deleteOne({
          _id: objectId(id)
        }).then(() => {
          deleteImage(buah.image)
          resolve(requestResponse.sukses('Berhasil Hapus List Buah'))
        }).catch(() => reject(requestResponse.serverError))
      })
    })