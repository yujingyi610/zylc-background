const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  pageLimt: state => state.app.pageLimt,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  isNationwide: state => state.home.isNationwide
}
export default getters
