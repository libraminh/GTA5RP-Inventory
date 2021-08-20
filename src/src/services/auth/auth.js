const instance = {};

instance.isAuthenticated = false;

instance.authenticate = function () {
  this.isAuthenticated = true;
};

instance.signout = function () {
  this.isAuthenticated = false;
};

export default instance;
