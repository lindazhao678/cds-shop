<script>
</script>

<main>
  <h1 class="text-center my-5">Edit CD</h1>
  <div class="row g-3 align-items-center mb-3">
    <div class="col-2">
      <label for="title" class="col-form-label">Title</label>
    </div>
    <div class="col-4">
      <input
        id="title"
        class="form-control"
        aria-describedby="titleHelpInline"
      />
    </div>
    <div class="col-6">
      <span id="titleHelpInline" class="form-text">
        Must be 8-20 characters long.
      </span>
    </div>
  </div>

  <div class="row g-3 align-items-center mb-3">
    <div class="col-2">
      <label for="genre" class="col-form-label">Genre</label>
    </div>
    <div class="col-4">
      <input
        id="genre"
        class="form-control"
        aria-describedby="genreHelpInline"
      />
    </div>
    <div class="col-6">
      <span id="genreHelpInline" class="form-text">
        Must be 8-20 characters long.
      </span>
    </div>
  </div>

  <div class="row g-3 align-items-center mb-3">
    <div class="col-2">
      <label for="stock" class="col-form-label">Stock</label>
    </div>
    <div class="col-4">
      <input
        id="stock"
        class="form-control"
        aria-describedby="stockHelpInline"
      />
    </div>
    <div class="col-6">
      <span id="stockHelpInline" class="form-text"> Must be a number. </span>
    </div>
  </div>

  <div class="row g-3 align-items-center mb-5">
    <div class="col-2">
      <label for="rate" class="col-form-label">Rate</label>
    </div>
    <div class="col-4">
      <input id="rate" class="form-control" aria-describedby="rateHelpInline" />
    </div>
    <div class="col-6">
      <span id="rateHelpInline" class="form-text"> Must be a number. </span>
    </div>
  </div>
  <div class="text-center">
    <button type="submit" class="btn btn-info">Update</button>
  </div>
</main>

<style>
  main {
    height: 80vh;
    width: 50vw;
    margin: 0 auto;
  }
</style>
