<script>
  //IMPORT LIBARIES
  import { query, mutation } from "svelte-apollo";
  import { navigate, useParams } from "svelte-navigator";

  //IMPORT QUERIES
  import { SINGLE_MOVIE } from "../queries/movies";
  import { EDIT_MOVIE } from "../queries/movies";
  import { ALL_GENRES } from "../queries/genres";

  //STATE
  const params = useParams();
  const movieId = $params.id;

  //APOLLO
  const editMovie = mutation(EDIT_MOVIE);
  const genres = query(ALL_GENRES);
  const movie = query(SINGLE_MOVIE, {
    variables: { id: movieId },
  });

  //STATE
  let title = "";
  let stock = "";
  let genreId = "";

  //EVENT
  async function handleSubmit() {
    console.log(movieId);
    console.log(title);
    try {
      const result = await editMovie({
        variables: {
          id: movieId,
          title: title,
          stock: stock,
          genreId: genreId,
        },
      });
      console.log(result);
      navigate("/", { replace: true });
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
          bind:value={title}
          class="form-control"
          aria-describedby="titleHelpInline"
          placeholder={$movie.data.movie.title}
        />
      </div>
      <div class="col-6">
        <span id="titleHelpInline" class="form-text">
          Must be 3-256 characters long.
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
          <!-- <p>Selected author ID: {author ? author : "[waiting...]"}</p> -->
        {/if}
      </div>
      <div class="col-6">
        <span id="genreHelpInline" class="form-text">
          Must select a genre.
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
          bind:value={stock}
          class="form-control"
          aria-describedby="stockHelpInline"
          placeholder={$movie.data.movie.stock}
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
