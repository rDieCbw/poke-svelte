
<script>
    import logo from '../assets/pokemon-logo.svg'
</script>

<header>
    <img src={logo} alt="Pokenon" />
    <h1>SVELTE POKÉDEX</h1>
</header>

<style lang="scss">
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #306ab2;
        padding: 16px;
        img {
            width: 200px;
        }
        h1 {
            font-size: 26px;
            font-weight: 900;
            color: #ffcb05;
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: black;
            margin-bottom: 0;
        }
    }
</style>
