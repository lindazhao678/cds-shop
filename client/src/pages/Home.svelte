<script>

</script>

<main>
  <div class="h-50 d-flex align-items-center justify-content-center">
    <h1>Hello Admin, Nice to see you here!</h1>
  </div>
  <div class="d-flex justify-content-center">
    <button
      type="button"
      class="btn btn-info me-5"
      on:click={() => (location.href = "/cd/add")}
    >
      Add Cds
    </button>
    <button
      type="button"
      class="btn btn-info me-5"
      on:click={() => (location.href = "/cds")}
    >
      View Cds
    </button><button
      type="button"
      class="btn btn-info"
      on:click={() => (location.href = "/cd/search")}
    >
      Search Cds
    </button>
  </div>
</main>

<style>
  main {
    height: 80vh;
  }
</style>
