<script>
  // Libaries
  import TableRow from "../components/TableRow.svelte";

</script>

<main>
  <div class="text-center my-5">
    <h1>All CDs</h1>
  </div>
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
      <TableRow />
    </tbody>
  </table>
</main>

<style>
  main {
    width: 60vw;
    margin: 0 auto;
    min-height: 80vh;
  }
</style>
