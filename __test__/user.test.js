import request from "supertest";
import app from "../src/app";
import { User } from "../src/model/userModel";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mahmoud",
  email: "mahmoudkhalid0122@gmail.com",
  password: "mahmoud444$",
  role: "user",
  verified: true,
  tokens: [
    {
      accessToken: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
      refreshToken: jwt.sign(
        { _id: userOneId },
        process.env.REFRESH_TOKEN_SECRET_KEY
      ),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await User.create(userOne);
});

// TEST CREATE NEW USER

test("Should Sign up a new user", async () => {
  await request(app)
    .post("/user")
    .send({
      name: "Mahmoud",
      email: "mahmoudkhalid0122+13@gmail.com",
      password: "mmm123#",
      role: "user",
    })
    .expect(201);
});

// TEST LOGIN USER

test("Should Login Existing User", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should fail login when credentails are bad", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "some@example.com",
      password: "mhhmm",
    })
    .expect(400);
});

// AUTHENTICATION AND AUTHORIZATION UNIT TEST
// 1. SHOULD GET PROFILE FOR USER
test("should get profile data for user", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 2. UNAUTHORIZED GET PROFILE DATA
test("should get profile data for user", async () => {
  await request(app).get("/user/me").send().expect(401);
});

// 3. SHOULD DELETE USER ACCOUNT
test("should delete user data", async () => {
  await request(app)
    .delete("/user/delete")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 4. UNAUTHORIZED DELETE ACCOUNT
test("should delete user data unauthorized", async () => {
  await request(app).delete("/user/delete").send().expect(401);
});

// // 5. UPLOAD USER AVATAR
// test("should upload user avatar", async () => {
//   (await request(app).post('/user/upload').set('Authorization', `Bearer ${userOne.tokens[0].token}`)).setEncoding({

//   });
// });

// 6. SHOULD GET AVATAR

// 7. LOGOUT USER
test("should logout user", async () => {
  await request(app)
    .get("/user/logout-user")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 8. SHOULD UPDATE PASSWORD
test("should update user password", async () => {
  await request(app)
    .post("/user/update-password")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send({
      oldPassword: userOne.password,
      newPassword: "123456",
    })
    .expect(200);
});

// 10. TEST UPDATE USERNAME
test("should update user name", async () => {
  await request(app)
    .put("/user/update-username")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send({
      name: "eng mahmoud",
    })
    .expect(200);
});

// 11. TEST GET REFRESH TOKEN
test("should get refresh token", async () => {
  await request(app)
    .get("/user/refresh-token")
    .set("Authorization", `Bearer ${userOne.tokens[0].refreshToken}`)
    .send()
    .expect(200);
});
