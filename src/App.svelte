<script>
  import Header from "./partials/Header.svelte";
  import Footer from "./partials/Footer.svelte";
  import Pokedex from "./components/Pokedex.svelte";
</script>

<main>  
  <Header />
  <Pokedex />
  <Footer />
</main>

<style lang="scss">
  :root {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  main {
    height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
</style>
