import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand logo-nav" href="#">
              <img
                src="./img/logo-ebenezer.png "
                alt="Logo Ebenezer"
                width="150"
                height="auto"
                className="d-inline-block align-text-top"
              />
            </a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Qué estás buscando?"
                aria-label="Search"
              />
              <button className="btn btn-outline-info" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={logout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/login")}
                  >
                    Iniciar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer class="footer text-center">
        <div class="contenedor">
          <div class="row">
            <div class="col-md-12">
              <div class="contact-info">
                <div class="social-icons">
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-tiktok"></i>
                  </a>
                </div>
                <p>
                  +57 300 366 62 08 | <a href="#">lauraynataly@gmail.com</a>
                </p>
                <p>
                  <i class="fas fa-map-marker-alt"></i> Medellín: Calle 89 D
                  #31-22 barrio Belen |<i class="fas fa-map-marker-alt"></i>{" "}
                  Montería: Diagonal 12 #4-24 B/La Granja |
                </p>
              </div>
              <p>
                &copy; Copyright 2024 Ebenezer-Store All rights reserved. Nueve
                Seis Dos SAS | 1067888598-8
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
