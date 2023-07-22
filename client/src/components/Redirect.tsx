import {
    FC,
    useEffect
} from 'react'
import {
    useNavigate,
    NavigateFunction
} from 'react-router-dom'

type Props = {
    to: string
}

const Redirect: FC<Props> = ({
    to
}) => {

    const navigate: NavigateFunction = useNavigate()
    useEffect(() => {
        navigate(to)
    }, [])
    return <></>
}

export default Redirect