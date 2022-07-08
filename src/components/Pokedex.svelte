<script>
    //DEPENDENCIES
    import axios from "axios";
    import { onMount } from "svelte";

    import pokedexDesktopBG from "../assets/pokedex.svg";
    import pokedexMobileBG from "../assets/pokedex-mobile.svg";
    import pokemonLogo from "../assets/pokemon-logo.svg";

    //PROPS
    const API_URL = "https://pokeapi.co/api/v2";

    //DATA
    let isMobileViewPort = document.documentElement.clientWidth <= 753;
    let pokemons = [];
    let types = [];
    let nextPokemonListPage = null;
    let prevPokemonListPage = null;
    let contextPokemon = null;

    //COMPUTED
    const getPokemonIdFromUrl = (url) => {
        return url.split("/")[6];
    };

    //METHODS
    const setResizeListener = () => {
        window.addEventListener("resize", () => {
            isMobileViewPort = document.documentElement.clientWidth <= 753;
        });
    };

    const getTypes = (url) => {
        axios
            .get(url)
            .then((response) => {
                types = response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPokemons = (url) => {
        axios
            .get(url)
            .then((response) => {
                pokemons = response.data.results;
                nextPokemonListPage = response.data.next;
                prevPokemonListPage = response.data.previous;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPokemonDetails = (url) => {
        axios
            .get(url)
            .then((response) => {
                var types = [];
                for (
                    var i = 0, len = response.data.types.length;
                    i < len;
                    i++
                ) {
                    types.push(response.data.types[i].type.name);
                }
                contextPokemon = {
                    id: response.data.id,
                    name: response.data.name,
                    image: response.data.sprites.front_default,
                    types: types,
                };
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPokemonsByType = (url) => {
        axios
            .get(url)
            .then((response) => {
                pokemons = [];
                for (
                    var i = 0, len = response.data.pokemon.length;
                    i < len;
                    i++
                ) {
                    pokemons.push(response.data.pokemon[i].pokemon);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const paginate = (url) => {
        getPokemons(url);
    };

    //MOUNT
    onMount(() => {
        setResizeListener();
        getPokemons(`${API_URL}/pokemon`);
        getTypes(`${API_URL}/type`);
    });
</script>

<div id="pokedex">
    {#if isMobileViewPort}
        <img class="bg" src={pokedexMobileBG} />
    {:else}
        <img class="bg" src={pokedexDesktopBG} />
    {/if}
    <div class="application">
        <div class="content">
            <div class="details">
                {#if contextPokemon}
                    <div class="card">
                        <span class="id">#{contextPokemon.id}</span>
                        <img src={contextPokemon.image} />
                        <p class="name">{contextPokemon.name}</p>
                        <div class="types">
                            {#each contextPokemon.types as type}
                                <span>{type}</span>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="card empty">
                        <span class="id">#0</span>
                        <img src={pokemonLogo} height="90" />
                        <p class="name">CLICK ON A POKEMON</p>
                    </div>
                {/if}
            </div>
            <div class="typeFilter">
                <p>Filter By Type</p>
                <div>
                    {#each types as type, index}
                        <button on:click={() => getPokemonsByType(type.url)}
                            >{type.name}</button
                        >
                    {/each}
                </div>
            </div>
        </div>
        <div class="listing">
            <div class="pokemons">
                {#each pokemons as pokemon}
                    <button on:click={() => getPokemonDetails(pokemon.url)}>
                        <span># {getPokemonIdFromUrl(pokemon.url)}</span>
                        -
                        <span>{pokemon.name}</span>
                    </button>
                {/each}
            </div>
            <div class="pagination">
                {#if prevPokemonListPage }
                <button
                    on:click|preventDefault={ () => paginate(prevPokemonListPage) }>previous</button
                >
                {/if}
                {#if nextPokemonListPage }
                <button
                    on:click|preventDefault={ () => paginate(nextPokemonListPage) }>next</button
                >
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    #pokedex {
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: #fff;
            border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        width: -moz-fit-content;
        width: fit-content;
        height: -moz-fit-content;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        position: relative;

        .bg {
            width: -moz-fit-content;
            width: fit-content;
            height: -moz-fit-content;
            height: fit-content;
            z-index: -1;
        }

        .application {
            padding: 29px;
            margin: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            position: absolute;
            height: 100%;

            .content {
                width: 100%;
                height: 68%;
                padding: 15% 66px 13px 13px;

                .details {
                    min-height: 178px;
                    background-color: white;
                    border: 1px solid #000;
                    border-radius: 9px;
                    margin: 20px 16px;

                    .card {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        min-height: 170px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-start;

                        &.empty{
                            img{
                                margin-top: 
                                24px;
                            }
                        }

                        .id {
                            position: absolute;
                            background-color: #000;
                            padding: 8px;
                            border-radius: 8px 0 8px 0;
                            color: white;
                        }

                        img {
                            margin: 0 auto;
                        }

                        .name {
                            text-align: center;
                            text-transform: capitalize;
                            font-size: 18px;
                            margin: 0;
                            width: 100%;
                            padding: 0 8px;
                        }

                        .types {
                            margin-top: 8px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            width: 100%;
                            padding: 0 8px;

                            span {
                                text-transform: capitalize;
                            }
                        }
                    }
                }

                .typeFilter {
                    margin-top: 64px;

                    p {
                        margin-top: 0;
                        margin-bottom: 8px;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                    }

                    div {
                        margin: 0 -2px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: center;
                        overflow-y: scroll;
                        height: 100px;

                        button {
                            margin: 2px 0;
                            background-color: #70c1df;
                            color: #000;
                            border: 1px solid #000000;
                            box-shadow: none;
                            font-weight: bold;
                            width: 100%;
                            padding: 6px;
                            border-radius: 8px;
                            text-transform: capitalize;
                        }
                    }
                }
            }

            .listing {
                width: 100%;
                height: 90%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                padding-left: 32px;

                .pokemons {
                    height: 286px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    overflow-y: scroll;
                    width: 100%;
                    background-color: green;
                    border-radius: 8px;
                    border: 1px solid #000;

                    button {
                        border: 1px solid transparent;
                        border-bottom: 1px solid #000;
                        background-color: transparent;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 4px;
                        margin: 6px 0;
                        color: white;

                        span {
                            font-size: 16px;
                            text-transform: capitalize;
                            padding: 0 4px;
                            text-align: left;
                        }
                    }
                }

                .pagination {
                    margin-top: 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;

                    button {
                        background-color: #fa9a05;
                        border: 1px solid black;
                        height: 51px;
                        width: 114px;
                        border-radius: 8px;
                        font-size: 18px;
                        text-transform: capitalize;
                    }
                }
            }
        }

        @media screen and (max-width: 753px) {
            .application {
                flex-direction: column;
                height: 100%;
                margin: 0;
                padding: 32% 10px 14px 25px;

                .content {
                    padding: 16px;
                    margin-top: 60px;
                    height: auto;
                    width: 90%;
                }

                .listing {
                    padding-right: 16px;
                    padding-left: 0;
                    height: 41%;

                    .pagination {
                        margin-top: 16px;
                    }
                }
            }
        }
    }
</style>
