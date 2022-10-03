<script>
  import {Link} from 'svelte-navigator'
</script>

<tr>
  <th scope="row">1</th>
  <td>Airplane</td>
  <td>6</td>
  <td><button type="button" class="btn btn-info"><Link to='/cd'>Details</Link>  </button></td>
  <td><button type="button" class="btn btn-info"> <Link to='/cd/edit'>Edit</Link> </button></td>
  <td><button type="button" class="btn btn-danger"> Delete </button></td>
</tr>
