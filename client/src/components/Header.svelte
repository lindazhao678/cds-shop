<script>
  import { Link, useLocation } from "svelte-navigator";

  const location = useLocation();
</script>

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid ms-5">
    <Link class="navbar-brand" to="/">
      <h3>Movies World CDs Shop</h3>
      Admin Dashboard</Link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse ms-5" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link
            class={`nav-link ms-5 ${$location.pathname === "/" && "active"}`}
            to="/">Home</Link
          >
        </li>
        <li class="nav-item">
          <Link
            class={`nav-link ms-5 ${$location.pathname === "/cds" && "active"}`}
            to="/cds">All CDs</Link
          >
        </li>
        <li class="nav-item">
          <Link
            class={`nav-link ms-5 ${
              $location.pathname === "/cd/add" && "active"
            }`}
            to="/cd/add">Add CD</Link
          >
        </li>
        <li class="nav-item">
          <Link
            class={`nav-link ms-5 ${
              $location.pathname === "/cd/search" && "active"
            }`}
            to="/cd/search">Search CD</Link
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
</style>
