import bcrypt from "bcryptjs";

// it is used to generate the hashed password
bcrypt.hash("", 10).then((val) => {
  console.log(val);
});
