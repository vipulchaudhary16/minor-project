import { Link, useLocation } from "react-router-dom";

interface NavLink {
  label: string;
  url: string;
}
interface NavProps {
  role: number;
}
const SideNav: React.FC<NavProps> = ({ role }) => {
  const location = useLocation();
  const role_to_link: { [key: number]: string } = {
    1: "/faculty",
    2: "/student",
    0: "/admin",
  };

  const navLinks: Array<NavLink> = [
    { label: "Profile", url: role_to_link[role] },
    { label: "Project List", url: role_to_link[role] + "/problem-list" },
    { label: "Notifications", url: role_to_link[role] + "/updates" },
  ];

  return (
    <div className="card h-screen flex flex-col justify-between px-[4.5rem] py-[2.5rem]">
      <div className="flex flex-col gap-[3rem]">
        <Link
          to={"/student"}
          className="text-[#5d87ff] text-[2.5rem] font-bold"
        >
          PDEU
        </Link>
        <ul className="flex flex-col gap-[1rem]">
          {navLinks.map((navlink, index) => (
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
          ))}
        </ul>
      </div>
      <div>
        <button className="w-full border border-[#5d87ff] text-[1.2rem] text-[#5d87ff] font-semibold py-[1rem] rounded-md hover:bg-[#5d87ff] hover:text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNav;
