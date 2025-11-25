
import { Link } from "react-router-dom";
import "./PostList.css";

export default function Front() {
 
  return (
    <>
      <Link className="btn-add" to="/postlist">
          + Postlist
        </Link>

        <Link className="btn-add" to="/studentlist">
          + Studentlist
        </Link>
    </>
  );
}
