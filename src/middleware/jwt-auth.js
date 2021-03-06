const AuthService = require("../auth/auth-service");

function requireAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({
      error: "Missing Bearer Token",
    });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }


  try {
    AuthService.verifyJwt(bearerToken);
    const payload = AuthService.verifyJwt(bearerToken);
    AuthService.getUserWithUsername(req.app.get("db"), payload.sub).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: "Unauthorized Request",
          });
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized Request",
    });
  }
}

module.exports = {
  requireAuth,
};
