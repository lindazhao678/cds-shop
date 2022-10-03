<script>
  import { Link } from "svelte-navigator";
</script>

<main>
  <div class="h-50 d-flex align-items-center justify-content-center">
    <h1>Hello Admin, Nice to see you here!</h1>
  </div>
  <div class="d-flex justify-content-center">
    <button type="button" class="btn btn-info me-5">
      <Link to="/cd/add">Add CDs</Link>
    </button>
    <button type="button" class="btn btn-info me-5">
      <Link to="/cds">View CDs</Link>
    </button>
    <button type="button" class="btn btn-info">
      <Link to="/cd/search">Search CDs</Link>
    </button>
  </div>
</main>

<style>
  main {
    height: 80vh;
  }
</style>
