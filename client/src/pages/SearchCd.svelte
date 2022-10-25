<script>
  // LIBARIES
  import { Link } from "svelte-navigator";
  import { query, mutation } from "svelte-apollo";

  //QUERIES
  import { SEARCH_MOVIES, DELETE_MOVIE } from "../queries/movies";

  //STATE
  let search = "";
  const deleteMovie = mutation(DELETE_MOVIE);
  const movies = query(SEARCH_MOVIES, {
    variables: {
      title: search,
    },
    fetchPolicy: "network-only",
  });

  //EVENTS
  async function handleSearch(e) {
    e.preventDefault();
    if (search != null || search != "") {
      movies.refetch({ title: search });
      document.getElementById("search-results").style.display = "block";
    }
  }

  async function handleDelete(id) {
    console.log(id);
    try {
      const result = await deleteMovie({
        variables: {
          id: id,
        },
      });
      console.log(result);
      movies.refetch();
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <div class="h-50 d-flex align-items-center justify-content-center">
    <h1 class="my-5">Search CDs</h1>
  </div>
  <div>
    <p>Search the CDs by title:</p>
    <form class="d-flex" role="search">
      <input
        class="form-control me-2"
        type="search"
        bind:value={search}
        placeholder="Search"
        aria-label="Search"
      />
      <button
        class="btn btn-outline-success"
        type="submit"
        on:click={handleSearch}>Search</button
      >
    </form>
  </div>

  <div id="search-results" style="display: none">
    <h1 class="my-5 text-center">Search Results</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Stock</th>
          <th scope="col" />
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {#if $movies.loading}
          <tr><td>Loading.App....</td></tr>
        {:else if $movies.error}
          <tr><td>Error: {$movies.error.message}</td></tr>
        {:else}
          {#each $movies.data.searchMovies as movie, i}
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
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    min-height: 80vh;
    width: 50vw;
    margin: auto;
  }
</style>
