import {
    FC,
    useCallback,
    useEffect,
    useState
} from 'react'
import Quill, {
    TextChangeHandler
} from 'quill'
import {
    EVENTS,
    SAVE_DOCUMENT_INTERVAL,
    SOCKET_URL,
    TOOLBAR_CONFIG
} from 'src/constants/index.ts'
import {
    io
} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import useDebounce from 'src/hooks/useDebounce.ts'

type DocumentPageParam = {
    documentId: string
}

const DocumentPage: FC = () => {

    const { documentId } = useParams<DocumentPageParam>()

    const [quill, setQuill] = useState<Quill>()
    const [socket, setSocket] = useState<any>()

    const debounce = useDebounce()

    const containerRef = useCallback((element: HTMLDivElement) => {
        if (element == null)
            return
        element.innerHTML = ''
        const _quill = new Quill(element, {
            theme: 'snow',
            modules: {
                toolbar: TOOLBAR_CONFIG
            }
        })
        _quill.disable()
        _quill.setText('Loading...')
        setQuill(_quill)
    }, [])

    const saveDocument = useCallback(() => {
        if (!socket || !quill)
            return

        debounce(() => {
            socket.emit(EVENTS.SAVE_DOCUMENT, { documentId, data: quill.getContents() })
        }, SAVE_DOCUMENT_INTERVAL)

    }, [documentId, socket, quill])

    useEffect(() => {
        if (socket)
            return
        const _socket = io(SOCKET_URL, {
            autoConnect: false
        })
        _socket.connect()

        setSocket(_socket)

        return () => {
            _socket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket || !quill)
            return

        socket.once(EVENTS.LOAD_DOCUMENT, (delta: any) => {
            quill.setContents(delta)
            quill.enable()
        })

        socket.emit(EVENTS.GET_DOCUMENT, documentId)

    }, [documentId, socket, quill])

    useEffect(() => {
        if (socket == null || quill == null)
            return

        const emitHandler = (delta: any) => {
            quill.updateContents(delta)
        }

        socket.on(EVENTS.EMIT_CHANGES, emitHandler)

        return () => {
            socket.off(EVENTS.EMIT_CHANGES, emitHandler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (quill == null || socket == null)
            return

        const eventHandler: TextChangeHandler = (
            delta,
            _oldDelta,
            source
        ) => {
            if (source != 'user')
                return
            socket.emit(EVENTS.SAVE_CHANGES, delta)
            saveDocument()
        }

        quill.on('text-change', eventHandler)

        return () => {
            quill.off('text-change', eventHandler)
        }

    }, [socket, quill])

    return (
        <div id={'container'} ref={containerRef} ></div>
    )
}

export default DocumentPage