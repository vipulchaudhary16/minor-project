import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../store/user/user.slice";
import { userSelector } from "../store/user/user.selector";
import { getNavlinks } from "../utils/navigation";
import { role_to_string } from "../utils/const_mappers";

interface NavProps {
  role: number;
}

const SideNav: React.FC<NavProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const logOutUser = () => {
    // window.location.href = "/";
    navigate('/');
    dispatch(setUser(null));
    localStorage.clear();
  };

  return (
    <div className="card h-full w-full flex flex-col justify-between p-[3rem] rounded-3xl">
      <div className="flex flex-col gap-[3rem]">
        <Link
          to={"/student"}
          className="text-primary-color text-[2.5rem] font-bold"
        >
          PDEU
        </Link>
        <div className="flex flex-col gap-[1rem]">
          {user &&
            getNavlinks(role_to_string[role], user.choice).map(
              (navlink, index) => (
                <>
                  <Link
                    to={navlink.url}
                    key={index}
                    className={`${
                      navlink.url === location.pathname
                        ? "bg-primary-color text-white"
                        : "text-[#2a3547] hover:bg-secondary-color hover:text-primary-color"
                    } p-[1.1rem] text-[1.35rem] font-medium cursor-pointer rounded-lg`}
                  >
                    {navlink.label}
                  </Link>
                </>
              )
            )}
        </div>
      </div>
      <div>
        <button
          onClick={() => logOutUser()}
          className="w-full border border-primary-color text-[1.2rem] text-primary-color font-semibold py-[1rem] rounded-md hover:bg-primary-color hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;
