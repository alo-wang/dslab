import { Link } from "react-router-dom";

const Headers = () => {
    return(
        <>
            <Link to={"/boards"}>List</Link>
            {/* <Link to={"/boards/1"}> | Detail</Link> */}
        </>
    )
}

export default Headers;