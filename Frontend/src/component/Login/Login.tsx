import LoginForm from "../Forms/LoginForm";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="bg-secondary-color max-h-screen h-screen flex">
      <div className="w-[30%] flex justify-center items-center">
        <div>
          <div className="p-[2rem] rounded-full">
            <img src="/Pdeu Logo.png" alt="PDEU Logo" />
          </div>
          <h2 className="text-primary-color text-[2rem] text-center font-bold">CP Portal</h2>
        </div>
      </div>
      <div className="w-[70%] bg-white rounded-l-[5%] shadow-2xl flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
