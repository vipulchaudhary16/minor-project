import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";
import { ProfileFaculty } from "./Faculty/ProfileCard";
import { ProfileCardStudent } from "./Student/Profile/ProfileCard";
import PageHeading from "./PageHeading";

const Profile = () => {
  const user = useSelector(userSelector);

  return (
    <>
      <div className="max-h-screen p-[3rem] overflow-auto">
        <PageHeading title="Profile" />
        <div className="">
          {user.role === 1 ? <ProfileFaculty /> : <></>}
          {user.role === 2 ? <ProfileCardStudent /> : <></>}
        </div>
      </div>
    </>
  );
};

export default Profile;
