// import { jest } from '@jest/globals';
// import { sendMessage } from './messageController.js';
// import Message from '../model/message.js';
// import { saveInDB } from '../db/dbQuires.js';

import request from "supertest";
import app from "../src/app";

test("Generic user can send a message", async () => {
  await request(app)
    .post("/message")
    .send({
      name: "mahmoud",
      email: "m@m.com",
      message: "test message from unit test",
    })
    .expect(201);
});

// describe('sendMessage', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should save the message and return a success message', async () => {
//         const req = {
//             body: {
//                 name: 'John Doe',
//                 email: 'john.doe@example.com',
//                 message: 'This is a test message.'
//             }
//         };

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn()
//         };

//         const mockMessage = new Message(req.body);
//         jest.spyOn(Message.prototype, 'constructor').mockImplementation(() => mockMessage);
//         jest.spyOn(saveInDB, 'saveInDB').mockResolvedValue();

//         await sendMessage(req, res);

//         expect(Message.prototype.constructor).toHaveBeenCalledWith(req.body);
//         expect(saveInDB.saveInDB).toHaveBeenCalledWith(mockMessage);
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.send).toHaveBeenCalledWith({ message: 'Your message has been sent successfully' });
//     });

//     it('should return a 400 error if the required fields are missing', async () => {
//         const req = {
//             body: {
//                 name: '',
//                 email: '',
//                 message: ''
//             }
//         };

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn()
//         };

//         await sendMessage(req, res);

//         expect(res.status).toHaveBeenCalledWith(400);
//         expect(res.send).toHaveBeenCalledWith({
//             error: 'please enter the requirements your email, your name, and the message'
//         });
//     });

//     it('should return a 500 error if there is an internal server error', async () => {
//         const req = {
//             body: {
//                 name: 'John Doe',
//                 email: 'john.doe@example.com',
//                 message: 'This is a test message.'
//             }
//         };

//         const res = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn()
//         };

//         jest.spyOn(Message.prototype, 'constructor').mockImplementation(() => {
//             throw new Error('Internal server error');
//         });

//         await sendMessage(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.send).toHaveBeenCalledWith({ error: 'internal server error' });
//     });
// });
// import { sendMessage, getMessages } from "../path/to/messageController.js";
// import { saveInDB, getAllMessages } from "../src/db/dbQuires.js";
// import Message from "../src/model/message.js";

// jest.mock("../db/dbQuires.js");

// describe("Message Controller", () => {
//   describe("sendMessage", () => {
//     it("should return 400 if name, email or message is missing", async () => {
//       const req = {
//         body: { name: "", email: "", message: "" },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       await sendMessage(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith({
//         error:
//           "please enter the requirements your email, your name, and the message",
//       });
//     });

//     it("should save the message and return success message", async () => {
//       const req = {
//         body: { name: "John", email: "john@example.com", message: "Hello" },
//       };
//       const res = {
//         send: jest.fn(),
//       };

//       saveInDB.mockResolvedValue();

//       await sendMessage(req, res);

//       expect(saveInDB).toHaveBeenCalledWith(new Message(req.body));
//       expect(res.send).toHaveBeenCalledWith({
//         message: "Your message has been sent successfully",
//       });
//     });

//     it("should return 500 on server error", async () => {
//       const req = {
//         body: { name: "John", email: "john@example.com", message: "Hello" },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       saveInDB.mockRejectedValue(new Error("Server error"));

//       await sendMessage(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.send).toHaveBeenCalledWith({ error: "internal server error" });
//     });
//   });

//   describe("getMessages", () => {
//     it("should return 400 if user is not admin", async () => {
//       const req = {
//         user: { role: "user" },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       await getMessages(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith({ error: "you're not an admin" });
//     });

//     it("should return messages if user is admin", async () => {
//       const req = {
//         user: { role: "admin" },
//       };
//       const res = {
//         send: jest.fn(),
//       };

//       const messages = [{ id: 1, name: "John", message: "Hello" }];
//       getAllMessages.mockResolvedValue(messages);

//       await getMessages(req, res);

//       expect(getAllMessages).toHaveBeenCalled();
//       expect(res.send).toHaveBeenCalledWith(messages);
//     });

//     it("should return 500 on server error", async () => {
//       const req = {
//         user: { role: "admin" },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       getAllMessages.mockRejectedValue(new Error("Server error"));

//       await getMessages(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.send).toHaveBeenCalledWith({ error: "internal server error" });
//     });
//   });
// });
