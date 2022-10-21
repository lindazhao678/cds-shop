<script>
  import { Link } from "svelte-navigator";
  import { query, mutation } from "svelte-apollo";

  // Queries
  import { ALL_MOVIES, DELETE_MOVIE } from "../queries/movies";

  //State
  const movies = query(ALL_MOVIES);
  const deleteMovie = mutation(DELETE_MOVIE);

  //Event
  async function handleDelete(id) {
    try {
      await deleteMovie({
        variables: {
          id: id,
        },
      });
      movies.refetch();
    } catch (e) {
      console.log(e);
    }
  }
</script>

{#if $movies.loading}
  <tr><td>Loading.App....</td></tr>
{:else if $movies.error}
  <tr><td>Error: {$movies.error.message}</td></tr>
{:else}
  {#each $movies.data.movies as movie, i}
    <tr>
      <th scope="row">{i + 1}</th>
      <td>{movie.title}</td>
      <td>{movie.stock}</td>
      <td
        ><button type="button" class="btn btn-info"
          ><Link to={`/cd/${movie.id}`}>Details</Link>
        </button></td
      >
      <td
        ><button type="button" class="btn btn-info">
          <Link to={`/cd/edit/${movie.id}`}>Edit</Link>
        </button></td
      >
      <td
        ><button
          on:click={handleDelete(movie.id)}
          type="button"
          class="btn btn-danger"
        >
          Delete
        </button></td
      >
    </tr>
  {/each}
{/if}
