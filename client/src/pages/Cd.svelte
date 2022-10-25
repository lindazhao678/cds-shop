<script>
  //LIBARIES
  import { query, mutation } from "svelte-apollo";
  import { useParams, navigate, Link } from "svelte-navigator";

  //QUERIES
  import { SINGLE_MOVIE, DELETE_MOVIE, ALL_MOVIES } from "../queries/movies";

  //STATE
  const params = useParams();
  const movieId = $params.id;
  const movies = query(ALL_MOVIES);
  const deleteMovie = mutation(DELETE_MOVIE);

  //APOLLO
  const movie = query(SINGLE_MOVIE, {
    variables: { id: movieId },
  });

  //Event
  async function handleDelete(id) {
    try {
      await deleteMovie({
        variables: {
          id: id,
        },
      });
      movies.refetch();
      navigate("/cds", { replace: true });
    } catch (e) {
      console.log(e);
    }
  }
</script>

<main>
  {#if $movie.loading}
    Loading....
  {:else if $movie.error}
    Error: {$movie.error.message}
  {:else}
    <h1 class="text-center my-5">{$movie.data.movie.title}</h1>
    <div class="info-section row align-items-center justify-content-center">
      <div class="info-content col-6 col-md-4">
        <ul>
          <li class="my-3">Genre: {$movie.data.movie.genre.name}</li>
          <li class="mb-3">Stock: {$movie.data.movie.stock}</li>
          <li class="mb-3">Rate: {$movie.data.movie.rate}</li>
          <li class="mb-3">Year: {$movie.data.movie.year}</li>
        </ul>
      </div>
    </div>
    <button type="button" class="btn btn-info">
      <Link to={`/cd/edit/${$movie.data.movie.id}`}>Edit</Link>
    </button>
    <button
      on:click={handleDelete($movie.data.movie.id)}
      type="button"
      class="btn btn-danger"
    >
      Delete
    </button>
  {/if} 
</main>

<style>
  main {
    width: 50vw;
    min-height: 80vh;
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
  }
</style>
