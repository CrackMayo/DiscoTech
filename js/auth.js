var idUsuario;
// Listen for status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email);
        const userUid = user.email;
        idUsuario = userUid;
        if (user.emailVerified) {
            userDataLogin(userUid);
            db.collection('accounts').doc(userUid).get().then(snap => {
                var rol = snap.data().rol;
                if (rol == "Cliente") {
                    obtenerDiscos();
                    changePage('section-initial-page', 'sign-in');
                } else {
                    obtenerDiscos();
                    changePage('section-initial-page', 'sign-in');
                }
            });
        }
    } else {
        console.log("Sesion Finalizada");
    }
})

function signUp() {
    // Get user info Form
    const email = document.getElementById("input-register-email").value;
    const nombreUsuario = document.getElementById("input-register-name").value;
    const cedulaUsuario = document.getElementById("input-register-nip").value;
    const numeroCelular = document.getElementById("input-register-phone").value;
    const tipoUsuario = document.getElementById("select-register-rol").value;
    const password1 = document.getElementById("input-register-password1").value;
    const password2 = document.getElementById("input-register-password2").value;
     var emailUser = email.toLowerCase();
    if (password1 === password2) {
        // Sing up the user
        auth.createUserWithEmailAndPassword(email, password1).then(function (data) {

            const userUid = data.user.uid;
            var account = null;
            // Set account  doc
            account = {
                userId: userUid,
                nombre: nombreUsuario,
                cedula: cedulaUsuario,
                celular: numeroCelular,
                rol: tipoUsuario,
            }

            db.collection('accounts').doc(emailUser).set(account).then(function () {
            }).catch(function (error) {
                console.error("Error: ", error);
            });

            alert("Usuario Creado!");
            data.user.sendEmailVerification();
            changePage('section-initial-page', 'register');
            userDataLogin(emailUser);

        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorMessage === "The email address is already in use by another account.") {
                    alert("Ya existe una cuenta de usuario asociada a ese correo electrónico");
                }
            });
    } else {
        alert("Las contraseñas no coinciden");
    }
    return false;

}

function logOut() {
    auth.signOut();
    changePage('sign-in', 'section-initial-page');
}

function passwordRecovery() {
    changePage('sign-in', 'account-recovery');
    const email = document.getElementById("input-account-recovery-username").value;
    console.log(firebase.auth().sendPasswordResetEmail(email));
    return false;
}

function singIn() {
    // Get user info
    var email = document.getElementById("input-sign-in-username").value.toLowerCase();
    const password = document.getElementById("input-sign-in-password").value;
    // Sing up the user
    auth.signInWithEmailAndPassword(email, password).then(function (data) {
        const userUid = email;
        idUsuario = userUid;
        if (data.user.emailVerified) {
            userDataLogin(userUid);
            changePage('section-initial-page', 'sign-in');
        } else {
            swal("Verifica tu correo!", "", "warning");
        }
    }).catch(function (error) {
        swal("Revise los campos ingresados", "", "warning");
        console.log(error);
    });
    return false;
}
