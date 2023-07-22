const { Server } = require('socket.io')
const {
    SOCKET_PORT,
    EVENTS,
    ALLOWED_METHODS,
    CLIENTS
} = require('./constants/index')
const {
    getDocumentById,
    saveDocument,
    updateDocument
} = require('./service/documentService')

const io = new Server(SOCKET_PORT, {
    cors: {
        origin: [...CLIENTS],
        methods: [...ALLOWED_METHODS]
    }
})

io.on(EVENTS.CONNECTION, socket => {

    socket.on(EVENTS.GET_DOCUMENT, async documentId => {
        try {
            const document = await getDocumentById(documentId)
                .then(document => document)

            if (!document) {
                const count = await saveDocument(documentId)
                    .then(result => result.affectedRows)
                if (count < 1)
                    throw new Error('Failed to create document!')
            }

            socket.join(documentId)
            socket.emit(EVENTS.LOAD_DOCUMENT, document.data ? JSON.parse(document.data) : null)

            socket.on(EVENTS.SAVE_DOCUMENT, async document => {
                if (!document || !document.documentId || !document.data)
                    return
                const savedDocument = getDocumentById(document.documentId)

                if (!savedDocument)
                    return
                const count = await updateDocument({ documentId: document.documentId, data: JSON.stringify(document.data) })
                    .then(result => result.affectedRows)

                if (count == 0) {
                    throw new Error(`Faile to update document ${document.documentId}`)
                }
            })


        } catch (e) {
            console.log(e)
        }

        socket.on(EVENTS.SAVE_CHANGES, delta => {
            socket.broadcast.to(documentId).emit(EVENTS.EMIT_CHANGES, delta)
        })
    })
})