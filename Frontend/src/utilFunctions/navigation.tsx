interface NavLink {
  label: string;
  url: string;
}

const adminNavlinks: Array<NavLink> = [
  {
    label: "Profile",
    url: "/admin",
  },
  {
    label: "Project List",
    url: "/admin/problem-list",
  },
  {
    label: "Users",
    url: "/admin/users",
  },
  {
    label: "Industry Requests",
    url: "/admin/industry-requests",
  },
];

const studentNavlinks_INH: Array<NavLink> = [
  {
    label: "Profile",
    url: "/student",
  },
  {
    label: "Project List",
    url: "/student/problem-list",
  },
  {
    label: "Updates",
    url: "/student/updates",
  },
];

const studentNavlinks_IND: Array<NavLink> = [
  {
    label: "Profile",
    url: "/student",
  },
  {
    label: "Updates",
    url: "/student/updates",
  },
];

const facultyNavlinks: Array<NavLink> = [
  {
    label: "Profile",
    url: "/faculty",
  },
  {
    label: "Project List",
    url: "/faculty/problem-list",
  },
  {
    label: "Updates",
    url: "/faculty/updates",
  },
];

export const getNavlinks = (role: string, choice = "") => {
  if (choice.length > 0 && role === "student") {
    switch (choice) {
      case "IND":
        return studentNavlinks_IND;
      case "INH":
        return studentNavlinks_INH;
      default:
        return [];
    }
  }

  switch (role) {
    case "admin":
      return adminNavlinks;
    case "faculty":
      return facultyNavlinks;
    default:
      return [];
  }
};
