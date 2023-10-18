import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setUser } from "../store/user/user.slice";
import { userSelector } from "../store/user/user.selector";
import { getNavlinks } from "../utils/navigation";
import { role_to_string } from "../utils/const_mappers";

interface NavProps {
  role: number;
}
const SideNav: React.FC<NavProps> = ({ role }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const logOutUser = () => {
    localStorage.clear();
    dispatch(setUser(null));
    window.location.href = "/";
  };

  return (
    <div className="card max-h-[95vh] h-[95vh] flex flex-col justify-between px-[4.5rem] py-[2.5rem] rounded-3xl">
      <div className="flex flex-col gap-[3rem]">
        <Link
          to={"/student"}
          className="text-[#5d87ff] text-[2.5rem] font-bold"
        >
          PDEU
        </Link>
        <ul className="flex flex-col gap-[1rem]">
          {user &&
            getNavlinks(role_to_string[role], user.choice).map(
              (navlink, index) => (
                <>
                  <Link
                    to={navlink.url}
                    key={index}
                    className={`${
                      navlink.url === location.pathname
                        ? "bg-[#5d87ff1a] text-[#5d87ff]"
                        : ""
                    } p-[1.1rem] text-[1.35rem] text-[#2a3547] font-medium cursor-pointer rounded-lg hover:bg-[#5d87ff1a] hover:text-[#5d87ff]`}
                  >
                    {navlink.label}
                  </Link>
                </>
              )
            )}
        </ul>
      </div>
      <div>
        <button
          onClick={() => logOutUser()}
          className="w-full border border-[#5d87ff] text-[1.2rem] text-[#5d87ff] font-semibold py-[1rem] rounded-md hover:bg-[#5d87ff] hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;
