firebase.initializeApp({
    apiKey: "AIzaSyA_KbKju_pF8fEpnCjdYLj3QLy5k3TOZjE",
    authDomain: "hackathonlaboratoria-d3894.firebaseapp.com",
    projectId: "hackathonlaboratoria-d3894"
});
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