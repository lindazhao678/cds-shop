<script>
  import { Router, Route } from "svelte-navigator";
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";

  // Import components
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Home from "./pages/Home.svelte";
  import Cds from "./pages/Cds.svelte";
  import Cd from "./pages/Cd.svelte";
  import AddCd from "./pages/AddCd.svelte";
  import EditCd from "./pages/EditCd.svelte";
  import SearchCd from "./pages/SearchCd.svelte";
  import PageNotFound from "./pages/PageNotFound.svelte";
  import {config} from "./config";

  console.log('API_ENDPOINT', `${config.apiEndpoint}`)
  // Create an Apollo client and pass it to all child components
  const client = new ApolloClient({
    uri: `${config.apiEndpoint}`,
    cache: new InMemoryCache(),
  });
  setClient(client);
</script>

<Router>
  <main>
    <Header />
    <Route path="/"><Home /></Route>
    <Route path="/cds"><Cds /></Route>
    <Route path="/cd/:id" primary={false}><Cd /></Route>
    <Route path="/cd/add"><AddCd /></Route>
    <Route path="/cd/edit/:id"><EditCd /></Route>
    <Route path="/cd/search"><SearchCd /></Route>
    <Route><PageNotFound /></Route>
    <Footer />
  </main>
</Router>
