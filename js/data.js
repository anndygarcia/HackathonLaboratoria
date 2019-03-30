firebase.initializeApp({
    apiKey: "AIzaSyA_KbKju_pF8fEpnCjdYLj3QLy5k3TOZjE",
    authDomain: "hackathonlaboratoria-d3894.firebaseapp.com",
    projectId: "hackathonlaboratoria-d3894"
});


// observador user
// document.getElementById('container').innerHTML = ''
// document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded es un evento
//     observador();
// }, false);

const htmlhome = () => {
    document.getElementById('container').innerHTML = `
    <header class ="header justify-content-end ">
        <nav class="nav navbar-expand-lg navbar-light bg-light ">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <form class="form-inline my-2 my-lg-0 justify-content-end">
            <button class="btn btn-outline-success my-2 my-sm-0" >Salir</button>
        </form>
        </div>
    </nav>
    </header>
    <section>
    </section>
    <section class="row mt-4">
        <div class="mx-auto" id="mapContainer"></div>
    </section>
    <div class="content">
        <section class="row">
            <section class="col-12">
                <h3 class="text-center my-3">Comentarios</h3>
                <section id="reviews"></section>
            </section>
        </section>
        <section class="my-3" id="form">
            <h3 class="text-center my-5">Agrega un comentario</h3>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Especialidad</label>
                    <input type="email" class="form-control" id="job"
                        placeholder="Front End Developer o UX Designer">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Empresa a evaluar</label>
                    <input type="text" class="form-control" id="company" placeholder="Nombre de la empresa">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Calificación</label>
                    <input type="text" class="form-control" id="rating"
                        placeholder="Dale una puntuación del 1 al 5.">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">¿Recomiendas esta empresa?</label>
                    <input type="text" class="form-control" id="recommendation" placeholder="Sí o No">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">¿Por qué?</label>
                    <input type="text" class="form-control" id="comment" placeholder="Comentarios de esta empresa">
                    <small id="emailHelp" class="form-text text-muted">Recuerda hablar de situaciones en concreto,
                        cómo
                        les diste solución, los agentes involucrados, ser totalmente objetiva, y trata de no
                        involucrar
                        sentimientos.</small>
                </div>
                <button id="add-review">Agregar reseña</button>
            </form>
        </section>
    </div>
    `;

    /*ANDY CODIGO*/
    // Initialize Cloud Firestore through Firebase
    let db = firebase.firestore();

    // Add reviews
    document.getElementById('add-review').addEventListener('click', event => {
        let job = document.getElementById('job').value;
        let company = document.getElementById('company').value;
        let rating = document.getElementById('rating').value;
        let recommendation = document.getElementById('recommendation').value;
        let comment = document.getElementById('comment').value;

        db.collection("reviews").add({
                job: job,
                company: company,
                rating: rating,
                recommendation: recommendation,
                comment: comment
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('job').value = '';
                document.getElementById('company').value = '';
                document.getElementById('rating').value = '';
                document.getElementById('recommendation').value = '';
                document.getElementById('comment').value = '';
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    });

    // Read reviews
    let reviews = document.getElementById('reviews');
    db.collection("reviews").onSnapshot(function (querySnapshot) {
        reviews.innerHTML = '';
        querySnapshot.forEach(function (doc) {
            reviews.innerHTML += `
        <div class="card my-3">
                    <div class="card-body">
                        <h5 class="card-title text-center">${doc.data().company}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${doc.data().job} 
                        <div class="float-right"><span class="mr-3">FECHA</span>
                        <span class="mr-3" onclick="editReview('${doc.id}', 
                        '${doc.data().job}', '${doc.data().company}', '${doc.data().rating}', 
                        '${doc.data().recommendation}', '${doc.data().comment}')"><i class="far fa-edit"></i></span>
                        <span class="mr-3" onclick="deleteReview('${doc.id}')"><i class="far fa-trash-alt"></i></span></div>
                        </h6>
                        <h6 class="card-title">Calificacion: ${doc.data().rating}</h6>
                        <h6 class="card-title">Recomiendas este lugar? ${doc.data().recommendation}</h6>
                        <h6 class="card-title">Comentarios</h6>
                        <p class="card-text">${doc.data().comment}</p>
                    </div>
                </div>`
        });
    });

    // Delete reviews
    const deleteReview = (id) => {
        db.collection("reviews").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    };

    // Edit reviews
    const editReview = (id, job, company, rating, recommendation, comment) => {
        document.getElementById('job').value = job;
        document.getElementById('company').value = company;
        document.getElementById('rating').value = rating;
        document.getElementById('recommendation').value = recommendation;
        document.getElementById('comment').value = comment;

        let btn = document.getElementById('add-review');
        btn.innerHTML = 'Actualizar';
        btn.onclick = () => {
            let reviewRef = db.collection("reviews").doc(id);
            let job = document.getElementById('job').value;
            let company = document.getElementById('company').value;
            let rating = document.getElementById('rating').value;
            let recommendation = document.getElementById('recommendation').value;
            let comment = document.getElementById('comment').value;
            return reviewRef.update({
                    job: job,
                    company: company,
                    rating: rating,
                    recommendation: recommendation,
                    comment: comment
                })
                .then(function () {
                    console.log("Document successfully updated!");
                    document.getElementById('job').value = '';
                    document.getElementById('company').value = '';
                    document.getElementById('rating').value = '';
                    document.getElementById('recommendation').value = '';
                    document.getElementById('comment').value = '';
                    btn.innerHTML = 'Agregar reseña';
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }
    /*ANDY CODIGO*/
}


const observador = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            htmlhome();
            // console.log(user);
            // nameUser(displayName);
            // ...
        } else {
            console.log(user);
            location.href = '/HackathonLaboratoria/index.html';
            // User is signed out.
            // ...
        }
    });
};




// logout
// firebase.auth().signOut().then(function() {
//     // Sign-out successful.
//   }).catch(function(error) {
//     // An error happened.
//   });