import { RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  discordAuth,
  discordDatabase,
  databaseTimestamp,
  GoogleAuthProvider,
} from "../../firebase";

const UserMenu = () => {
  const [user, loading, error] = useAuthState(discordAuth);
  const loginWithGoogle = () => {
    discordAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(({ user, additionalUserInfo }) => {
        if (additionalUserInfo?.isNewUser) {
          const createdAt = databaseTimestamp;
          discordDatabase
            .ref(`users/${user?.uid}`)
            .set({
              fullname: user?.displayName,
              email: user?.email,
              profile_picture: user?.photoURL,
              createdAt,
              updatedAt: createdAt,
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        height: 52,
      }}
      className="bg-gray-alt px-2 flex justify-between items-center"
    >
      {!loading && !error && user ? (
        <>
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
          <button
            onClick={(e) => {
              var userStatusDatabaseRef = discordDatabase.ref(
                "/users/" + user.uid
              );
              userStatusDatabaseRef.update({
                state: "offline",
                last_changed: databaseTimestamp,
              }).finally(() => {
                discordAuth.signOut();
              })
            }}
            className="text-danger p-1.5 rounded-sm outline-none hover:bg-danger hover:bg-opacity-20 active:text-white active:bg-danger active:bg-opacity-100 "
          >
            <RiLogoutCircleRLine size={20} />
          </button>
        </>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="text-success w-full p-1.5 rounded-sm outline-none hover:bg-success hover:bg-opacity-20 active:text-white active:bg-success active:bg-opacity-100 "
        >
          Login
          <RiLoginCircleLine size={20} className="inline ml-2" />
        </button>
      )}
    </div>
  );
};

export default UserMenu;
