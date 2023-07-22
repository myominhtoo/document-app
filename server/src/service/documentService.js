const mysqlConnection = require('../config/mysqlConnection')
const { QUERIES } = require('../constants/index')

const getDocumentById = (documentId) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(QUERIES.DOCUMENT.findById, [documentId], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result ? result[0] : undefined)
        })
    })
}

const saveDocument = (documentId) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(QUERIES.DOCUMENT.save, [[documentId]], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const updateDocument = ({
    documentId,
    data
}) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(QUERIES.DOCUMENT.update, [data, documentId], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = {
    getDocumentById,
    saveDocument,
    updateDocument
}