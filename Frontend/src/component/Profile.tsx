import { useState } from "react";
import ProfileCard from "./ProfileCard";
import PopUp from "./PopUp";
import GroupForm from "./Student/GroupForm";

const Profile = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <>
      <div className="">
        <div className="max-h-screen p-[6rem] overflow-auto">
          <div className="bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg">
            <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">
              Profile
            </h2>
          </div>
          <div className="card p-[3.5rem] rounded-lg">
            <ProfileCard />
          </div>
          <div className="my-[2rem]">
            <button 
            className="bg-[#5d87ff] text-white text-[1.3rem] font-semibold py-[1rem] px-[1.8rem] rounded-md hover:bg-[#557deb]"
            onClick={() => setIsPopUpOpen(true)}
            >
              Create Team
            </button>
            {isPopUpOpen && (
              <PopUp heading="" isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen}>
                <GroupForm />
              </PopUp>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
