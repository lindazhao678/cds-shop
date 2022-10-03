<script>
  import { Router, Route } from "svelte-navigator";

  // Import components
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Home from "./pages/Home.svelte";
  import Cds from "./pages/Cds.svelte";
  import Cd from "./pages/Cd.svelte";
  import AddCd from "./pages/AddCd.svelte";
  import EditCd from "./pages/EditCd.svelte";
  import SearchCd from "./pages/SearchCd.svelte";
</script>

<Router>
  <main>
    <Header />
    <Route path="/"><Home /></Route>
    <Route path="/cds"><Cds /></Route>
    <Route path="/cd"><Cd /></Route>
    <Route path="/cd/add"><AddCd /></Route>
    <Route path="/cd/edit"><EditCd /></Route>
    <Route path="/cd/search"><SearchCd /></Route>
    <Footer />
  </main>
</Router>
