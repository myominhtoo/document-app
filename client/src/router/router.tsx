import { FC } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Redirect from 'src/components/Redirect.tsx'
import { routes } from 'src/constants/index.ts'
import DocumentPage from 'src/pages/document/DocumentPage.tsx'
import { v4 as uuIdV4 } from 'uuid'

const AppRouter: FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path={routes.ROOT}
                    element={<Redirect to={`${routes.DOCUMENT}/${uuIdV4()}`} />}
                />
                <Route
                    path={`${routes.DOCUMENT}/:documentId`}
                    element={<DocumentPage />}
                />
            </Routes>
        </Router>
    )
}

export default AppRouter