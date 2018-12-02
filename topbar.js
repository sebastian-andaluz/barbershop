function assignTopbar() {
  let topbar_element = document.getElementById("topbar-element");
  let topbar = document.createElement('div');
  topbar.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">All Kinds Hair Co.</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="about.html">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="services.html">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="portfolio.html">Our Haircuts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="appointment.html">Schedule an Appointment</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `
  topbar_element.parentNode.insertBefore(topbar, topbar_element);
}

assignTopbar();
