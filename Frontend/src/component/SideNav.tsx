import { Link } from "react-router-dom";

interface NavLink {
    label: string,
    url: string,
}

const SideNav = () => {
    const navLinks: Array<NavLink> = [
        { label: 'Home', url: '/student' },
        { label: 'Project List', url: '/student/problem-list' },
        { label: 'Notifications', url: '/student/updates' },
    ];

    return (
        <div className="h-screen flex flex-col gap-[3rem] px-[4.5rem] py-[2rem] border-r-[.1rem]">
            <Link to={'/student'} className="text-[#5d87ff] text-[2.5rem] font-bold">PDEU</Link>
            <ul className="flex flex-col gap-[1rem]">
                {navLinks.map((navlink, index) =>
                    <Link to={navlink.url} key={index} className="p-[1.1rem] text-[1.35rem] text-[#2a3547] font-medium cursor-pointer rounded-lg hover:bg-[#5d87ff1a] hover:text-[#5d87ff]">{navlink.label}</Link>
                )}
            </ul>
            <div>
            </div>
        </div>
    )
}

export default SideNav;