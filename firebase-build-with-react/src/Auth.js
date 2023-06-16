import { default as React } from "react";
import { auth,googleProvider } from "./firebase-config";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

//   console.log(auth?.currentUser?.email)

  const SignIn = async () => {
      setEmail("")
      setPassword("")
    try{
        await createUserWithEmailAndPassword(auth,email, password );
    }
    catch(err){
        console.error(err)
    }
  };

  const SignInWithGoogle = async () => {

  try{
      await signInWithPopup(auth, googleProvider);
  }
  catch(err){
      console.error(err)
  }
};


const LogOut = async () => {

    try{
        await signOut(auth);
    }
    catch(err){
        console.error(err)
    }
  };
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        name="email"
        value={email}
        placeholder="Email..."
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        name="password"
        value={password}
        placeholder="Password..."
      />
      <button type="button" onClick={SignIn}>
        Sign in
      </button>
      <button type="button" onClick={SignInWithGoogle}>
        Sign in with Google
      </button>
      <button type="button" onClick={LogOut}>
        Log out
      </button>
    </div>
  );
};

export default Auth;
