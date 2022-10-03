<script>
  import TableRow from "../components/TableRow.svelte";
</script>

<main>
  <div class="text-center my-3">
    <h3>There are 6 movies in the database</h3>
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
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
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
