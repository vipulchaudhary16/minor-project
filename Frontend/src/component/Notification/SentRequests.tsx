// import axios from "axios";
// import { useEffect, useState } from "react";
// import { TRequest } from "../../types/request.types";
// import { Request } from "./Request";
// import { toast } from "react-toastify";
// import { Loader } from "../Utils/Loader";

// type SentRequestsProps = {
//   activeTab: number;
// };

// export const SentRequests: React.FC<SentRequestsProps> = ({ activeTab }) => {
//   const [requests, setRequests] = useState<{
//     groupRequests: TRequest[];
//     projectRequests: TRequest[];
//   }>({
//     groupRequests: [],
//     projectRequests: [],
//   });
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     getNotifications();
//   }, [activeTab]);

//   const getNotifications = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/project-request?type=sent"
//       );
//       setRequests(res.data);
//     } catch (error: any) {
//       toast.error(error.response.data);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="py-4">
//       {/* <div className='bg-secondary-color p-[1.5rem] rounded-lg'>
// 				<h2 className='text-[1.5rem] text-primary-color font-semibold'>
// 					Group Requests
// 				</h2>
// 			</div> */}
//       {loading ? (
//         <Loader heading="Please wait!!" />
//       ) : requests.groupRequests.length > 0 ? (
//         <div className="my-[1.5rem]">
//           {requests.groupRequests.map((request) => (
//             <Request
//               request={request}
//               requestType="sent"
//               onSuccess={getNotifications}
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="font-bold text-xl p-4">No Group Requests</p>
//       )}
//       {/* <div className='bg-secondary-color p-[1.5rem] rounded-lg'>
// 				<h2 className='text-[1.5rem] text-primary-color font-semibold'>
// 					Project Requests
// 				</h2>
// 			</div> */}
//       {loading ? (
//         <Loader heading="Please wait!!" />
//       ) : requests.projectRequests.length > 0 ? (
//         requests.projectRequests.map((request) => (
//           <Request
//             request={request}
//             requestType="sent"
//             onSuccess={getNotifications}
//           />
//         ))
//       ) : (
//         <p className="font-bold text-xl p-4">No Project Requests</p>
//       )}
//     </div>
//   );
// };
