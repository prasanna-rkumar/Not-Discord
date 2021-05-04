import { RiLogoutCircleRLine } from "react-icons/ri";

const UserMenu = () => {
  return (
    <div
      style={{
        height: 52,
      }}
      className="bg-gray-alt px-2 flex justify-between items-center"
    >
      <div>
        <img
          className="h-8 w-8 rounded-full inline mr-2"
          alt="person"
          src="https://cdn.discordapp.com/avatars/441263263947423754/ba5e779d3adb7b0844b856e60398e6ed.png?size=128"
        />
        <span className="font-semibold text-md text-white">
          prasanna_rkumar
        </span>
      </div>
      <button className="text-danger p-1.5 rounded-sm outline-none hover:bg-danger hover:bg-opacity-20 active:text-white active:bg-danger active:bg-opacity-100 ">
        <RiLogoutCircleRLine size={20} />
      </button>
    </div>
  );
};

export default UserMenu;
