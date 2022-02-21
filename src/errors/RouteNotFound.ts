export default class RouteNotFound extends Error {
  constructor() {
    super('Route not found');
  }
}
