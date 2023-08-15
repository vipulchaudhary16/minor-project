import { useState } from "react";
import ProfileCard from "./ProfileCard";
import PopUp from "./PopUp";
import GroupForm from "./Student/GroupForm";
import { GroupTable } from "./Student/GroupTable";
import { useSelector } from "react-redux";
import { userSelector } from "../store/user/user.selector";

const Profile = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const user = useSelector(userSelector);

  return (
    <>
      <div className="">
        <div className="max-h-screen p-[6rem] overflow-auto">
          <div className="bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg">
            <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">
              Profile
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-[3rem]">
            <div className="card p-[3.5rem] rounded-lg">
              <ProfileCard />
            </div>
            <div className="card p-[2.5rem]">
              <div className="flex justify-between items-center">
                <h3 className="text-[#2A3547] text-[1.9rem] font-semibold">
                  Group Details
                </h3>
                <div>
                  <button
                    className="bg-[#5d87ff] text-white text-[1.1rem] font-semibold py-[.8rem] px-[1.4rem] rounded-md hover:bg-[#557deb]"
                    onClick={() => setIsPopUpOpen(true)}
                  >
                    Create Group
                  </button>
                  {isPopUpOpen && (
                    <PopUp
                      heading=""
                      isOpen={isPopUpOpen}
                      setIsOpen={setIsPopUpOpen}
                    >
                      <GroupForm />
                    </PopUp>
                  )}
                </div>
              </div>
              <div className="h-[85%] mt-[1rem]">
                {user?.group.length > 1 ? (
                  <div className="h-full  flex justify-center items-center text-[1.3rem] font-medium">Not in any group</div>
                ) : (
                  <>
                    <GroupTable groupInformation={user.group[0]} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
