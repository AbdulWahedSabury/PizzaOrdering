import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((store)=>store.user.userName)

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-6">👋 Welcome! Please start by telling us your name:</p>

      {userName === '' ? (
        <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 w-72 rounded-full mb-4 px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400"
      />
      ) : (
        <Button type='primary' to='/menu'>Start ordering...</Button>
      )}
      

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
