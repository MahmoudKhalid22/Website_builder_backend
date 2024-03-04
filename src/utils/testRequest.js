// import fetch from "node-fetch";
const testReq = async () => {
  try {
    await fetch("https://zweb-nqfq.onrender.com/test");
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    setTimeout(testReq, 600000);
  }
};
const testReqDev = async () => {
  try {
    await fetch("https://zweb.onrender.com/test");
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    setTimeout(testReq, 600000);
  }
};

export { testReq, testReqDev };
