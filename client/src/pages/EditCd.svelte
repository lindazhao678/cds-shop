<script>
  //IMPORT LIBARIES
  import { query, mutation } from "svelte-apollo";
  import { navigate, useParams } from "svelte-navigator";
  import { Alert } from "sveltestrap";
  import Joi from "joi";

  //IMPORT QUERIES
  import { SINGLE_MOVIE } from "../queries/movies";
  import { EDIT_MOVIE } from "../queries/movies";
  import { ALL_GENRES } from "../queries/genres";

  //STATE
  const params = useParams();
  const movieId = $params.id;
  let title = "";
  let stock = "";
  let genreId = "";
  let rate = "";
  let year = "";
  let errors = null;

  //APOLLO
  const editMovie = mutation(EDIT_MOVIE);
  const genres = query(ALL_GENRES);
  const movie = query(SINGLE_MOVIE, {
    variables: { id: movieId },
  });

  //Validation
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    genreId: Joi.required(),
    stock: Joi.number().required(),
    rate: Joi.number().required(),
    year: Joi.number().required(),
  });

  function validateForm(schema, data) {
    errors = null;
    const result = schema.validate(data, { abortEarly: false });
    const { error } = result;
    if (!error) {
      return null;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      errors = errorData;
      return errorData;
    }
  }

  //EVENT
  async function handleSubmit() {
    if (
      validateForm(schema, {
        title: title,
        genreId: genreId,
        stock: stock,
        rate: rate,
        year: year,
      })
    ) {
      return;
    }
    try {
      const result = await editMovie({
        variables: {
          id: movieId,
          title: title,
          genreId: genreId,
          stock: parseInt(stock),
          rate: parseInt(rate),
          year: parseInt(year),
        },
      });
      navigate("/cds", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  //If the data for the movie has loaded store it in state
  $: if ($movie.loading) {
    console.log("loading");
  } else if (title == "") {
    title = $movie.data.movie.title;
    genreId = $movie.data.movie.genreId;
    stock = $movie.data.movie.stock;
  }
</script>

<main>
  <h1 class="text-center my-5">Edit CD</h1>
  {#if $movie.loading}
    Loading...
  {:else if $movie.error}
    Error: {$movie.error.message}
  {:else}
    <div class="row g-3 align-items-center mb-3">
      <div class="col-2">
        <label for="title" class="col-form-label">Title</label>
      </div>
      <div class="col-4">
        <input
          id="title"
          name="title"
          bind:value={title}
          class="form-control"
          aria-describedby="titleHelpInline"
          placeholder={$movie.data.movie.title}
        />
      </div>
      <div class="col-6">
        <span id="titleHelpInline" class="form-text">
          Must be 2-256 characters long.
        </span>
      </div>
      {#if errors?.title}
        <Alert color={"danger"}>{errors.title}</Alert>
      {/if}
    </div>

    <div class="row g-3 align-items-center mb-3">
      <div class="col-2">
        <label for="genreId" class="col-form-label">Genre:</label>
      </div>
      <div class="col-4">
        {#if $genres.loading}
          Loading genres
        {:else if $genres.error}
          Error: {$genres.error.message}
        {:else}
          <select bind:value={genreId} name="genreId" id="genreId">
            {#each $genres.data.genres as genre, i}
              <option value={genre.id}>{genre.name}</option>
            {/each}
          </select>
        {/if}
      </div>
      <div class="col-6">
        <span id="genreHelpInline" class="form-text">
          Must select a genre.
        </span>
      </div>
      {#if errors?.genreId}
        <Alert color={"danger"}>{errors.genreId}</Alert>
      {/if}
    </div>

    <div class="row g-3 align-items-center mb-3">
      <div class="col-2">
        <label for="stock" class="col-form-label">Stock</label>
      </div>
      <div class="col-4">
        <input
          id="stock"
          name="stock"
          bind:value={stock}
          class="form-control"
          aria-describedby="stockHelpInline"
          placeholder={$movie.data.movie.stock}
        />
      </div>
      <div class="col-6">
        <span id="stockHelpInline" class="form-text"> Must be a number.</span>
      </div>
      {#if errors?.stock}
        <Alert color={"danger"}>{errors.stock}</Alert>
      {/if}
    </div>

    <div class="row g-3 align-items-center mb-3">
      <div class="col-2">
        <label for="rate" class="col-form-label">Rate</label>
      </div>
      <div class="col-4">
        <input
          id="rate"
          name="rate"
          bind:value={rate}
          class="form-control"
          aria-describedby="rateHelpInline"
          placeholder={$movie.data.movie.rate}
        />
      </div>
      <div class="col-6">
        <span id="stockHelpInline" class="form-text"> Must be a number.</span>
      </div>
      {#if errors?.rate}
        <Alert color={"danger"}>{errors.rate}</Alert>
      {/if}
    </div>

    <div class="row g-3 align-items-center mb-3">
      <div class="col-2">
        <label for="year" class="col-form-label">Year</label>
      </div>
      <div class="col-4">
        <input
          id="year"
          name="year"
          bind:value={year}
          class="form-control"
          aria-describedby="rateHelpInline"
          placeholder={$movie.data.movie.year}
        />
      </div>
      <div class="col-6">
        <span id="yearHelpInline" class="form-text"> Must be a number.</span>
      </div>
      {#if errors?.year}
        <Alert color={"danger"}>{errors.year}</Alert>
      {/if}
    </div>

    <div class="text-center mt-5">
      <button on:click={handleSubmit} type="submit" class="btn btn-info"
        >Update</button
      >
    </div>
  {/if}
</main>

<style>
  main {
    height: 80vh;
    width: 50vw;
    margin: 0 auto;
  }
  select {
    width: 100%;
    border: 1px solid #ced4da;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
  }
</style>
