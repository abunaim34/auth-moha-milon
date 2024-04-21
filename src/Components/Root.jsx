import {Outlet} from "react-router-dom"
import Navber from "./Navber";

const Root = () => {
    return (
        <div>
            <Navber />
            <Outlet></Outlet>
        </div>
    );
};

export default Root;