const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin" || user.role === "super-admin") {
      return next();
    }
    res.status(401).send({ error: "you're not an admin" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { isAdmin };
