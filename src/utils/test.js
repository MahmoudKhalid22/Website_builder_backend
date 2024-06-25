import jwt from "jsonwebtoken";

const decoded = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc5ZTM1MTUyYjY4ZGY2NmNmNWFhMGUiLCJpYXQiOjE3MTkzMzI1NTksImV4cCI6MTcyMTkyNDU1OX0.NxdwO4BQRuZ4ZDx295xbthsQVk-6DificHDg2JFxiek",
  "refreshtokensecretforgetnewaccesstoken"
);

console.log(decoded);
