import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div>
        {/* inicio carrousel */}
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/img/bienvenido.png" class="d-block w-100" alt="baner de bienvenida" />
            </div>
            <div class="carousel-item">
              <img src="/img/baner2.png" class="d-block w-100" alt="banner promocional" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        {/* fin carrousel */}
      </div>
    </MainLayout>
  );
};

export default Home;
