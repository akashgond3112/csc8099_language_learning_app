import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./LoginRegister.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/utils";
import { postLogIn, postRegister } from "../../store/actions/auth-actions";

function LoginRegister() {
  const [displaySignInForm, setdisplaySignInForm] = useState(false);
  const [displayLogin, setdisplayLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/dashBoard";

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (displayLogin) {
      dispatch(postLogIn({ username: email, password: pass }));
      if (from === `/dashBoard`) {
        navigate(from, { replace: false });
      } else {
        navigate(from, { replace: true });
      }
    } else if (displaySignInForm) {
      dispatch(
        postRegister({
          firstName: firstName,
          lastName: lastName,
          location: location,
          email: email,
          password: pass,
          mobileNumber: phone,
          gender: gender,
        })
      );
      navigate(from, { replace: true });
    }

    const empty: string[] = [];
    if (displaySignInForm) {
      if (firstName === "") {
        empty.push("First name");
      }
      if (lastName === "") {
        empty.push("Last name");
      }
      if (phone === "") {
        empty.push("phone");
      }
    }

    if (email === "") {
      empty.push("email");
    }
    if (pass === "") {
      empty.push("password");
    }
    setEmptyFields(empty);
    if (empty.length > 0) {
      alert("Please fill in the following fields: " + empty.join(", "));
    } else {
      console.log(emptyFields);
    }
    setEmail("");
    setPass("");
  };

  return (
    <div className={classes.main}>
      {displayLogin ? (
        <div className={classes.authFormContainer}>
          <h2>Login</h2>
          <form className={classes.authFormContainer} onSubmit={handleSubmit}>
            <label className={classes.label} htmlFor="email">
              email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="password">
              paassword
            </label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
              className={classes.input}
            />
            <button className={classes.linkBtn} type="submit">
              Log In
            </button>
          </form>
          <button
            className={classes.linkBtn}
            onClick={() => {
              setdisplayLogin(!displayLogin);
              setdisplaySignInForm(!displaySignInForm);
            }}
          >
            Don't have an account? Register here
          </button>
        </div>
      ) : (
        <div className={classes.authFormContainer}>
          <h2>Register</h2>
          <form className={classes.authFormContainer} onSubmit={handleSubmit}>
            <label className={classes.label} htmlFor="firstName">
              First name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="firstName"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="lastName">
              Last name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="lastName"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="location">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="location"
              name="location"
              id="location"
              placeholder="Location"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="gender">
              Gender
            </label>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              type="gender"
              name="gender"
              id="gender"
              placeholder="Gender"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="phone">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="phone"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              className={classes.input}
            />
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="******"
              id="password"
              name="password"
              className={classes.input}
            />
            <button className={classes.linkBtn} type="submit">
              Sign Up
            </button>
          </form>
          <button
            className={classes.linkBtn}
            onClick={() => {
              setdisplayLogin(!displayLogin);
              setdisplaySignInForm(!displaySignInForm);
            }}
          >
            Already have an account? Login here
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginRegister;
