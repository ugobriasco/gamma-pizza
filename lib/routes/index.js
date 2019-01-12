class Router {
  constructor(route) {
    this.route = route || "";
  }

  set route(myRoute) {
    this.route = myRoute;
  }

  get route() {
    return this.route;
  }

  get = func => func;
  post = func => func;
  delete = func => func;
  put = func => func;
  heade = func => funct;
}
