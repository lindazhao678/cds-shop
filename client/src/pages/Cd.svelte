<script>
  //LIBARIES
  import { query } from "svelte-apollo";
  import { useParams } from "svelte-navigator";

  //QUERIES
  import { SINGLE_MOVIE } from "../queries/movies";

  //STATE
  const params = useParams();
  const movieId = $params.id;
  $: console.log(movieId);

  //APOLLO
  const movie = query(SINGLE_MOVIE, {
    variables: { id: movieId },
  });
  $: console.log(movie);
</script>

<main>
  {#if $movie.loading}
    Loading.App....
  {:else if $movie.error}
    Error: {$movie.error.message}
  {:else}
    <h1 class="text-center my-5">{$movie.data.movie.title}</h1>
    <div class="info-section row align-items-center justify-content-center">
      <div class="info-image col-6 col-md-4">
        <img class="img-thumbnail image-fluid" src="" alt="" />
      </div>
      <div class="info-content col-6 col-md-4">
        <ul>
          <li class="my-3">Genre: {$movie.data.movie.genre.name}</li>
          <li class="mb-3">Stock: {$movie.data.movie.stock}</li>
        </ul>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    width: 60vw;
    height: 60vh;
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
  }
</style>
