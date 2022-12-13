import { useState, useEffect } from "react";
import { getCurrentUser, getUserInfo } from "../services/auth.service";
import IUser from "../types/user.type";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  const [infoUser, setInfoUser] = useState<IUser | undefined>(undefined);


  useEffect(() => {
    if(currentUser){
      const getInfo = async () => {
        await getUserInfo(currentUser);
        setInfoUser(await getUserInfo(currentUser));
      }

      getInfo()
    }
  },[])

  return (
    <div className="container">
      {infoUser && (
        <>
          <header className="jumbotron">
            <h3>
              Profile: <strong>{infoUser.username}</strong> 
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.substring(0, 20)} ...{" "}
            {currentUser.substr(currentUser.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {infoUser._id}
          </p>
          <p>
            <strong>Email:</strong> {infoUser.email}
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;