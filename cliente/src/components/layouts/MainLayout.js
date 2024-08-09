import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { isAuthenticated, logout, nombre } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        {/* inicio primer nav */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand logo-nav" href="#">
              <img
                src="/img/logo-ebenezer.png"
                alt="Logo Ebenezer"
                width="150"
                height="auto"
                className="d-inline-block align-text-top"
              />
            </a>
            <div className="mx-auto">
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
            </div>
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated && (
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
        {/* final primer nav */}

        {/* inicio segundo nav */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSecond"
              aria-controls="navbarSecond"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSecond"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tienda">
                    Tienda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/nosotros">
                    Nosotros
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contactenos">
                    Contactenos
                  </a>
                </li>
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/productos">
                        Gestion de Productos
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {nombre}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={logout}
                          >
                            Cerrar Sesión
                          </a>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {/* Final Segundo nav */}
      </header>

      {/* espacio para los elementos hijos */}
      <main>{children}</main>
      {/* final espacio elementos hijos */}

      {/* espacio para el footer */}
      <footer className="footer text-center">
        <div className="contenedor">
          <div className="row">
            <div className="col-md-12">
              <div className="contact-info">
                <div className="social-icons">
                  <a href="#" className="mx-2" style={{ color: "#4267B2" }}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="mx-2" style={{ color: "#E1306C" }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="mx-2" style={{ color: "#FF0000" }}>
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="mx-2" style={{ color: "#69C9D0" }}>
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
                <p>
                  +57 300 366 62 08 | <a href="#">lauraynataly@gmail.com</a>
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i> Medellín: Calle 89 D
                  #31-22 barrio Belen |<i className="fas fa-map-marker-alt"></i>{" "}
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

