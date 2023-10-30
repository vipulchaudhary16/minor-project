import React, { useState } from "react";
import PopUp from "../../Utils/PopUp";
import GroupForm from "../GroupForm";
import { GroupTable } from "../GroupTable";

type Props = {
    user: any;
};

export const GroupDetails : React.FC<Props> = ({user}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <div>
      <div className="card p-[2.5rem]">
        <div className="flex justify-between items-center">
          <h3 className="text-[#2A3547] text-[1.9rem] font-semibold">
            Group Details
          </h3>
          <div>
            <button
              className="bg-primary-color text-white text-[1.1rem] font-semibold py-[.8rem] px-[1.4rem] rounded-lg hover:bg-[#557deb]"
              onClick={() => setIsPopUpOpen(true)}
            >
              Create Group
            </button>
            {isPopUpOpen && (
              <PopUp heading="" isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen}>
                <GroupForm />
              </PopUp>
            )}
          </div>
        </div>
        <div className="h-[85%] mt-[1rem]">
          {user?.group.length > 1 ? (
            <div className="h-full  flex justify-center items-center text-[1.3rem] font-medium">
              Not in any group
            </div>
          ) : (
            <>
              <GroupTable groupInformation={user.group} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
