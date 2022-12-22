import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function getPasswordHash(myPlaintextPassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(myPlaintextPassword, SALT_ROUNDS)
      .then(function (hash: string) {
        resolve(hash);
      })
      .catch(function (error: any) {
        console.log("Error while hashing password: ", error);
        reject(error);
      });
  });
}

export function checkPasswordHash(
  user: { username: string; passwordHash: string },
  passwordAttempt: string
) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(passwordAttempt, user.passwordHash)
      .then(function (result) {
        resolve(result);
      })
      .catch(function (error: any) {
        console.log("Error while checking password hash: ", error);
        reject(error);
      });
  });
}
