function quit()
{
	saveCookie("username", "");
	document.location.href = '/login.html';
}

function getNome()
{
	return document.getElementById("name").value;
}

function getNomeUsuario()
{
	return document.getElementById("username").value;
}

function getSenhaUsuario()
{
	return document.getElementById("password").value;
}

function getEspecialidade()
{
	return document.getElementById("speciality").value;
}

function addSpeciality()
{
	document.getElementById("specialityBlock").style.display = 'block'
}

function removeSpeciality()
{
	document.getElementById("specialityBlock").style.display = 'none'
}

document.getElementById('submit').addEventListener("click", function() {

	var epaciente = document.getElementById("paciente").checked;
	var emedico = document.getElementById("medico").checked;

	if (getNome() == "" || getNomeUsuario() == "" || getSenhaUsuario() == "" || (emedico && getEspecialidade() == ""))
	{
		alert("Preencha todos os campos.");
		return;
	}

	console.log("REG");

	var especialidade = '';
	if(emedico)
		especialidade = getEspecialidade();

	var xhr = new XMLHttpRequest();
	var url = "register";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");


	var data = JSON.stringify({"name": getNome(), "username": getNomeUsuario(), "password": getSenhaUsuario(), "epaciente": epaciente, "emedico": emedico, "speciality": especialidade});
	xhr.send(data);

	alert("Registro efetuado com sucesso");
	document.location.href = '/login.html';
	return false;
})

document.getElementById('submit')
document.getElementById("specialityBlock").style.display = 'none'
