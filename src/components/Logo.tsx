import { LOGO } from "../assets"

const Logo = () => {
  return (
    <div>
    <img className="lg:w-[100px] lg:h-[100px] xs:ml-2 lg:ml-0" src={LOGO} alt="" />
  </div>
  )
}

export default Logo;