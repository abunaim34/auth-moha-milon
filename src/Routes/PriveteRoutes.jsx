import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate} from "react-router-dom"
import PropTypes from 'prop-types';


const PriveteRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext)

    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }
    if(user){
        return children
    }
    return <Navigate to="/login"></Navigate>;
};

PriveteRoutes.propTypes = {
    children: PropTypes.node
}

export default PriveteRoutes;