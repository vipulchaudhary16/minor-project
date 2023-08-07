import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import NotificationCardStudent from "./Student/NotificationCard";
import NotificationCardFaculty from "./Faculty/NotificationCard";

export const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/request/");
      console.log(res);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-screen p-[6rem] overflow-auto">
      <div className="bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg">
        <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">
          Notifications
        </h2>
      </div>
      <div className="flex flex-col gap-[2rem] mb-[2rem]">
        {notifications.map((notification) =>
          user?.role === 1 ? (
            <NotificationCardFaculty notification={notification} />
          ) : (
            <NotificationCardStudent notification={notification} />
          )
        )}
      </div>
    </div>
  );
};
