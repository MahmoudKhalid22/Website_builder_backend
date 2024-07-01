import request from "supertest";
import app from "../src/app";
import { User } from "../src/model/userModel";
import {
  userOneId,
  adminOneId,
  userOne,
  adminOne,
  setupDatabase,
} from "./fixtures/db";
import Plan from "../src/model/subPlan";

beforeEach(setupDatabase);

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
  const response = await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
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

// 5. UPLOAD USER AVATAR
test("should upload user avatar", async () => {
  const response = await request(app)
    .post("/user/upload")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .attach("avatar", "__test__/fixtures/download.jpeg")
    .expect(200);
});

// SHOULD GET USER AVATAR
test("should get user avatar", async () => {
  await request(app)
    .get("/user/avatar")
    .set("Authorization", "Bearer " + userOne.tokens[0].accessToken)
    .send()
    .expect(200);
});

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
  const response = await request(app)
    .put("/user/update-username")
    .set("Authorization", `Bearer ${userOne.tokens[0].accessToken}`)
    .send({
      name: "eng mahmoud",
    })
    .expect(200);
  expect(response.body.newName).toBe("eng mahmoud");
});

// 11. TEST GET REFRESH TOKEN
test("should get refresh token", async () => {
  await request(app)
    .get("/user/refresh-token")
    .set("Authorization", `Bearer ${userOne.tokens[0].refreshToken}`)
    .send()
    .expect(200);
});

// 12. TEST ADMIN GET ALL USERS
test("admin should get all users", async () => {
  await request(app)
    .get("/user/admin-users?role=user")
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 13. TEST GET ALL MESSAGES
test("admin should get all messages", async () => {
  await request(app)
    .get("/message/admin")
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 14. ADMIN TEST NEW USER
test("admin should register new user", async () => {
  await request(app)
    .post("/user/admin-new-user")
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send({
      name: "mahmoud from admin",
      email: "mahmoudkhalid0122+3@gmail.com",
      password: "pass123$",
      role: "user",
      verified: true,
    })
    .expect(201);
});

// 15. TEST GET USER ID PAGES
test("admin get pages of user", async () => {
  await request(app)
    .get(`/user/${userOne._id}/pages`)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 16. TEST GET ONE USER PAGE

// 17. TEST DELETE ALL USER'S PAGES

// 18. TEST DELETE ONE USER'S PAGE

// 19. TEST ADMIN BLOCKS USER
test("admin should block one user", async () => {
  await request(app)
    .put(`/user/block/${userOne._id}`)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 19. TEST ADMIN UNBLOCKS USER
test("admin should block one user", async () => {
  await request(app)
    .put(`/user/unblock/${userOne._id}`)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 19. TEST ADMIN DELETES USER
test("admin should block one user", async () => {
  await request(app)
    .delete(`/user/admin-delete-user/${userOne._id}`)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 19. TEST ADMIN SENDS ALERT TO USER
test("admin should block one user", async () => {
  await request(app)
    .post(`/user/send-alert/${userOne._id}`)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});

// 20. TEST ADD PLANS
test("admin should add a new plan", async () => {
  await request(app)
    .post("/plan/new")
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send({
      name: "free plan",
      price: 0,
      description: [
        "you can add a new page",
        "you can use ai as a helping tool",
        "you can take your free domain",
      ],
    })
    .expect(201);
});

// 21. TEST GENERIC USER GETS PLANS
test("generic user gets all plans", async () => {
  await request(app).get("/plan").send().expect(200);
});

// 22. ADMIN UPDATES A PLAN
test("admin updates an existing plan", async () => {
  const plans = await Plan.find({});
  const plan = plans[0];
  await request(app)
    .patch("/plan/" + plan._id)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send({
      name: "premium",
      price: 20,
      description: [
        "you can use more advanced ai tools",
        "you can get your source code",
        "you can get paid template",
        "you can customize your domain",
      ],
    })
    .expect(200);
});
// 22. ADMIN DELETES A PLAN
test("admin updates an existing plan", async () => {
  const plans = await Plan.find({});
  const plan = plans[0];
  await request(app)
    .delete("/plan/" + plan._id)
    .set("Authorization", `Bearer ${adminOne.tokens[0].accessToken}`)
    .send()
    .expect(200);
});
