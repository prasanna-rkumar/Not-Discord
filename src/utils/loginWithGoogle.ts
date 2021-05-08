import { databaseTimestamp, discordAuth, discordDatabase, GoogleAuthProvider } from "../firebase";

const loginWithGoogle = () => {
  discordAuth
    .signInWithPopup(new GoogleAuthProvider())
    .then(({ user, additionalUserInfo }) => {
      if (additionalUserInfo?.isNewUser) {
        const createdAt = databaseTimestamp;
        discordDatabase.ref(`users/${user?.uid}`).set({
          fullname: user?.displayName,
          email: user?.email,
          profile_picture: user?.photoURL,
          createdAt,
          updatedAt: createdAt,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default loginWithGoogle;
