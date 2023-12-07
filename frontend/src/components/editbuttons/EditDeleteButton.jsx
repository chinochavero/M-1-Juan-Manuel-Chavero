import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const EditorButtons = ({ isLoggedIn }) => {
    if (isLoggedIn) {
        return (
            <div>            
                <Link 
                style={{ fontSize: "30px", color: "green" }}
                className="icon-editar"
                >
                <HiOutlinePencilAlt />
                </Link>
                <Link
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={"#modal" + post._id}
                    style={{ fontSize: "30px", color: "red" }} className="icon-borrar"
                >
                    <HiOutlineTrash />
                </Link>                    
                    <DeletePostModel
                        getPost={getPost}
                        modalId={modalId}
                        postId={post._id}
                    />
             </div>    
        );
    }
};

export default EditorButtons;

