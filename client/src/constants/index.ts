

/*
 *   @for route names 
 *   --- start here ---
 */
export const routes = {
    ROOT: '/',
    DOCUMENT: '/documents'
}

/*
 *   @for route names
 *   --- end here ---
 */


/*
 * config object for toolbar for editor
 * --- start here --- 
 */

export const TOOLBAR_CONFIG = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
]

/*
 * config object for toolbar for editor
 * --- end here --- 
 */


// socket server url
export const SOCKET_URL = 'http://localhost:3001'

// save document interval
export const SAVE_DOCUMENT_INTERVAL = 3000

// socket events
export const EVENTS = {
    SAVE_CHANGES: 'save-changes',
    EMIT_CHANGES: 'emit-changes',
    GET_DOCUMENT: 'get-document',
    LOAD_DOCUMENT: 'load-document',
    SAVE_DOCUMENT: 'save-document'
}
