<script>
  // Libaries
  import { mutation, query } from "svelte-apollo";
  import { navigate } from "svelte-navigator";
  import { Alert } from "sveltestrap";
  import Joi from "joi";

  // Queries
  import { ADD_MOVIE } from "../queries/movies.js";
  import { ALL_GENRES } from "../queries/genres";

  // State
  let title = "";
  let stock = "";
  let genreId = "";
  let errors = null;

  // Apollo
  const addMovie = mutation(ADD_MOVIE);
  const genres = query(ALL_GENRES);

  //Validation
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    genreId: Joi.required(),
    stock: Joi.number().required(),
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
  const handleSubmit = async () => {
    if (validateForm(schema, { title: title, genreId: genreId, stock: stock })) {
      return;
    }
    try {
      const result = await addMovie({
        variables: {
          title: title,
          genreId: genreId,
          stock: parseInt(stock),
        },
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
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
        bind:value={title}
        class="form-control"
        aria-describedby="titleHelpInline"
        placeholder="title"
      />
    </div>
    <div class="col-6">
      <span id="titleHelpInline" class="form-text">
        Must be 2-256 characters long.
      </span>
    </div>
  </div>

  <div class="row g-3 align-items-center mb-3">
    <div class="col-2">
      <label for="genre" class="col-form-label">Genre:</label>
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
      <span id="genreHelpInline" class="form-text"> Must select a genre. </span>
    </div>
  </div>

  <div class="row g-3 align-items-center mb-3">
    <div class="col-2">
      <label for="stock" class="col-form-label">Stock</label>
    </div>
    <div class="col-4">
      <input
        id="stock"
        bind:value={stock}
        class="form-control"
        aria-describedby="stockHelpInline"
        placeholder="stock"
      />
    </div>
    <div class="col-6">
      <span id="stockHelpInline" class="form-text"> Must be a number.</span>
    </div>
  </div>

  <div class="text-center mt-5">
    <button on:click={handleSubmit} type="submit" class="btn btn-info"
      >Update</button
    >
  </div>
</main>

<style>
  main {
    width: 50vw;
    margin: 10vh auto;
    min-height: 60vh;
  }
</style>
