import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" w-screen h-16 flex items-center justify-between px-5 pr-0 bg-slate-200">
      <div className="logo">
        <Link to='/' className="font-bold text-3xl uppercase font-mono">Eco<span className="font-mono font-thin text-2xl">Emission</span></Link>
      </div>
      <div id="navlinks" className="flex w-2/6 justify-evenly items-center text-lg">
        <Link to="/about" className="">About Us</Link>
        <Link to="/check" className="">CO2 Emission</Link>
        <Link to="/guide" className="">Guidelines</Link>
        <Link to="/user" className="bg-[url('/images/user.png')] bg-cover border-[1px] border-black rounded-full w-12 h-12"></Link>
      </div>
    </div>
  );
};

export default Header;