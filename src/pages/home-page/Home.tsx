import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../../components";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-end md:mr-[104px] mt-12">
        <Logo />
      </div>
      <div className="-200 flex justify-center">
        <div className="flex flex-col gap-6 md:gap-10 md:w-[640px] md:mt-[286px]  ">
          <div className="text-center">
            <span className="block text-black font-poppins font-semibold text-2xl">
              +91 9123456789
            </span>
          </div>

          <Button
            className="md:w-full xs:w-64 h-[48px]"
            text="Log out"
            type="button"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
