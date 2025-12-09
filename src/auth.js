export function loginFake() {
  localStorage.setItem("token", "mi-token-falso");

  // Borra el token después de 5 minutos (300000 ms)
  setTimeout(() => {
    localStorage.removeItem("token");
  }, 300000);
}
export function logout() {
  localStorage.removeItem("token");
}
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
