// import fetch from "node-fetch";
const testReq = async () => {
  try {
    await fetch("https://zweb.onrender.com/test");
    // const data = await res.json();
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setTimeout(testReq, 600000);
  }
};

export { testReq };
