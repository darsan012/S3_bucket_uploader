import bcrypt from "bcryptjs";

bcrypt.hash("", 10).then((val) => {
  console.log(val);
});
