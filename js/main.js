const url = "https://ghibliapi.herokuapp.com/films";

document.getElementById("header-container").innerHTML = `
    <div class="hero-container">
        <img src="img/Studio_Ghibli.webp" alt="">
        <nav class="nav-container">
            <ul class="links-container">
                <li><a href="index.html">Home</a></li>
                <li><a href="favoritos.html">Favoritos</a></li>
             </ul>
        </nav>
    </div>
`

const app = new Vue({
    el:"#app",
    data:{
        peliculas: [],
        fav: [],
        peliSeleccionada: ""
    },
    created(){
        this.fetchData(url);
        this.crearLista();
    },
    methods:{
        fetchData(url){
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                this.peliculas = data;
                console.log(data);
            })
        },
        favBtn(str){
            let favs = JSON.parse(localStorage.getItem("favs"));

            if(favs.indexOf(str) === -1){
                favs.push(str);
            }
            else{
                favs.splice(favs.indexOf(str),1);
            }

            localStorage.setItem("favs", JSON.stringify(favs));

            this.fav = favs;
        },
        crearLista(){
            if(localStorage.getItem("favs") === null){
                localStorage.setItem("favs",'[]');
            }else{
                let favs = JSON.parse(localStorage.getItem("favs"));
                this.fav = favs;
            }
        },
        hola(pelicula){
            console.log(pelicula);
            this.peliSelecionada = pelicula;
            localStorage.setItem("idPeli",pelicula.id);
        }
    }
})