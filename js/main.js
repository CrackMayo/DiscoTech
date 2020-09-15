var discoActualizar;

function userDataLogin(userId) {
  let lista = document.getElementById("espacio");
  lista.innerHTML = "";
}

//Change View without reloading discos
function changePage(idIn, idOut) {
  document.getElementById(idOut).classList.add("invisible");
  document.getElementById(idIn).classList.remove("invisible");
}

//Change View with reloading discos
function changePage2(idIn, idOut) {
  obtenerDiscos();
  document.getElementById(idOut).classList.add("invisible");
  document.getElementById(idIn).classList.remove("invisible");
}

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

function dropdownRegister(text) {
  document.getElementById("dropdown-register-text").innerHTML = text;
}

function btnLook(id, span) {
  if (document.getElementById(id).type == "password") {
    document.getElementById(id).type = "text";
    document.getElementById(span).classList.add("fa-eye");
    document.getElementById(span).classList.remove("fa-eye-slash");
  } else {
    document.getElementById(id).type = "password";
    document.getElementById(span).classList.remove("fa-eye");
    document.getElementById(span).classList.add("fa-eye-slash");
  }
}

function crearDisco() {
  var imagen = document.getElementById("files").files[0];
  var nombreDiscoteca = document.getElementById("input-create-disco-name")
    .value;
  var direccion = document.getElementById("input-create-disco-address").value;
  var horario = document.getElementById("input-create-disco-schedule").value;
  var genero = document.getElementById("input-create-disco-type").value;
  var descripcion = document.getElementById("input-create-disco-description")
    .value;

  if (isFileImage(imagen)) {
    const disco = {
      nombreDiscoteca: nombreDiscoteca,
      ubicacion: direccion,
      horarioDeOperacion: horario,
      tipo: genero,
      descripcionDetallada: descripcion,
    };

    //Create disco Owner
    const ownerRef = db
      .collection("accounts")
      .doc(idUsuario)
      .collection("discotecas")
      .doc(nombreDiscoteca);
    ownerRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        alert("Ya existe una discoteca con el nombre ingresado");
        return;
      } else {
        ownerRef
          .set(disco)
          .then(function () {
            if (imagen != null) {
              uploadImageDisco(imagen, nombreDiscoteca);
            } else {
              setDefaultImagen(nombreDiscoteca);
            }
          })
          .catch(function (error) {
            console.error("Error: ", error);
          });
      }
    });
  }
  return false;
}

function updateDisco() {
  var updateElements = [
    document.getElementById("input-update-disco-name"),
    document.getElementById("input-update-disco-address"),
    document.getElementById("input-update-disco-schedule"),
    document.getElementById("input-update-disco-type"),
    document.getElementById("input-update-disco-description")
  ];
  const disco = {
    ubicacion: updateElements[1].value,
    horarioDeOperacion: updateElements[2].value,
    tipo: updateElements[3].value,
    descripcionDetallada: updateElements[4].value,
  };
  db.collection("accounts")
    .doc(idUsuario)
    .collection("discotecas")
    .doc(updateElements[0].value)
    .update(disco)
    .then(function () {
      swal("Discoteca Actualizada!", "", "success");
      obtenerDiscos();
      changePage("section-initial-page", "update-Disco");
    })
    .catch(function (error) {
      swal("Ha Ocurrido un Error!", "", "error");
    });
  return false;
}

function deleteDisco() {
  db.collection("accounts")
    .doc(idUsuario)
    .collection("discotecas")
    .doc(discoActualizar)
    .delete()
    .then(function () {
      storage
        .ref()
        .child(
          "/" +
            idUsuario +
            "/discotecas/" +
            discoActualizar +
            "/" +
            discoActualizar
        )
        .delete()
        .then(function () {
          swal("Discoteca Eliminada!", "", "success");
          changePage2("section-initial-page", "update-Disco");
        })
        .catch(function (error) {
          swal("Ha Ocurrido un Error!", "", "error");
        });
    })
    .catch(function (error) {
      swal("Ha Ocurrido un Error!", "", "error");
    });
}

function uploadImageDisco(imagen, discoteca) {
  var url = 0;
  // Created a Storage Reference with root dir
  var storageRef = storage.ref();
  // Get the file from DOM
  var file = imagen;
  // console.log(file);

  //dynamically set reference to the file name
  var thisRef = storageRef.child(
    "/" + idUsuario + "/discotecas/" + discoteca + "/" + imagen.name
  );

  //put request upload file to firebase storage
  thisRef.put(file).then(function (snapshot) {
    alert("Se ha creado una nueva discoteca");
    console.log("Uploaded a blob or file!");

    snapshot.ref.getDownloadURL().then(function (DownloadURL) {
      url = DownloadURL;

      db.collection("accounts")
        .doc(idUsuario)
        .collection("discotecas")
        .doc(discoteca)
        .update({ imagenDiscoteca: url })
        .then(function () {
          console.log("Document successfully updated!");
          console.log(url);
          changePage2("section-initial-page", "create-disco");
          obtenerCamion();
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });
}


function obtenerDiscos() {
  let lista = document.getElementById("espacio");
  lista.innerHTML = "";
  db.collection("accounts")
    .doc(idUsuario)
    .collection("discotecas")
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (child) {
        lista.innerHTML =
          lista.innerHTML +
          "<div class='col-md-3'><div class='card'> " +
          "<img class='card-img-top' src='" +
          child.data().imagenDiscoteca +
          "' alt='Card image cap'>" +
          "<div class='card-body' align='center'>" +
          "<h5 class='card-title'>" +
          child.id +
          "</h5>" +
          "<p class='card-text'></p>" +
          "<button class='btn btn-primary' type='button' onclick='loadDisco(" +
          '"' +
          child.id +
          '"' +
          ");'>Modificar</button></div></div></div>";
      });
    });
}

function loadDisco(id) {
  console.log(id);
    changePage('update-Disco', 'section-initial-page');
    discoActualizar = id;
    var updateElements = [document.getElementById("input-update-disco-name"), document.getElementById("input-update-disco-address"), document.getElementById("input-update-disco-schedule"), document.getElementById("input-update-disco-type"), document.getElementById("input-update-disco-description")];
    updateElements[0].disabled = true;
    db.collection('accounts').doc(idUsuario).collection('discotecas').doc(id).get().then(snapshot => {
        appActualizar = snapshot.id;
        updateElements[0].value = snapshot.id;
        updateElements[1].value = snapshot.data().ubicacion;
        updateElements[2].value = snapshot.data().horarioDeOperacion;
        updateElements[3].value = snapshot.data().tipo;
        updateElements[4].value = snapshot.data().descripcionDetallada;
    })
}

function isFileImage(file) {
  if (!file) {
    return true;
  } else if (file["type"].split("/")[0] === "image") {
    return true;
  } else {
    return false;
  }
}


