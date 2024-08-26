import MainLayout from "../layouts/MainLayout";
import './Nosotros.css';

const Nosotros = () => {
  return (
    <MainLayout>
      <div className="sobre-nosotros-section">
      {/* Hero Section */}
      <div className="hero-section text-center text-light d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="display-3">EBENEZER-STORE</h1>
          <p className="lead">Ropa con propósito, estilo con valores.</p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Nuestra Historia */}
        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <h2 className="h3 text-primary">Nuestra Historia</h2>
            <p>
              <strong>EBENEZER-STORE</strong> nació de la visión de crear ropa que no solo 
              ofrezca estilo y confort, sino que también refleje nuestros valores cristianos. 
              Inspirados por la necesidad de una línea de ropa que promueva principios sólidos, 
              nos embarcamos en esta aventura para ofrecer productos que realmente marcan la diferencia.
            </p>
          </div>
          <div className="col-md-6">
            <img src="/img/historia.jpg" className="img-fluid rounded shadow-lg" alt="Nuestra Historia" />
          </div>
        </div>

        {/* Nuestra Trayectoria */}
        <div className="row align-items-center my-5 flex-row-reverse">
          <div className="col-md-6">
            <h2 className="h3 text-primary">Nuestra Trayectoria</h2>
            <p>
              Desde nuestros inicios, hemos superado numerosos desafíos que nos han permitido 
              crecer y evolucionar. Hoy, somos una empresa sólida, comprometida con la satisfacción 
              de nuestros clientes y con la misión de llevar a cabo nuestro propósito a través 
              de cada prenda que ofrecemos.
            </p>
          </div>
          <div className="col-md-6">
            <img src="/img/evolucionando.jpg" className="img-fluid rounded shadow-lg" alt="Nuestra Trayectoria" />
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="row my-5 text-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h2 className="h4 text-primary">Misión</h2>
                <p>
                  Proporcionar ropa de alta calidad que combine confort y estilo, 
                  mientras se mantiene fiel a nuestros valores cristianos. 
                  Nuestra misión es ofrecer una experiencia de compra satisfactoria y significativa.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h2 className="h4 text-primary">Visión</h2>
                <p>
                  Convertirnos en la tienda de referencia para quienes buscan ropa 
                  que no solo sea elegante y cómoda, sino que también refleje valores 
                  y principios sólidos. Nos esforzamos por crecer de manera sostenible 
                  y expandir nuestra influencia a nuevas áreas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evolución */}
        <div className="row align-items-center my-5">
          <div className="col-md-12">
            <h2 className="h3 text-primary text-center">Nuestra Evolución</h2>
            <p className="text-center">
              Desde nuestros primeros pasos, hemos evolucionado significativamente. 
              Lo que comenzó como un pequeño proyecto se ha convertido en una marca reconocida 
              por su calidad y compromiso con los valores cristianos. Cada producto que ofrecemos 
              refleja nuestro camino y nuestra dedicación a mejorar continuamente.
            </p>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default Nosotros;
