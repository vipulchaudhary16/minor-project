import ProfileCard from "./ProfileCard";

const Home = () => {

  return (
    <>
      <div className="">
        <div className="max-h-screen p-[6rem] overflow-auto">
          <div className="bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg">
            <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">Profile</h2>
          </div>
          <div className="card p-[3.5rem] rounded-lg">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;