code = "AAAAAAabc123";
url = "ajaxapi.php";

async function read() {
  document.getElementById("code").innerHTML = "code=" + code;

  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;

  let str = "<h1>Read</h1>";
  str += "<p>Number of records: " + data.rowCount + "</p>";
  str += "<p>Last max " + data.maxNum + " records:</p>";

  // Táblázat fejléce
  str += "<table border='1' cellpadding='5' cellspacing='0'><tr>";
  str += "<th>Id</th><th>Name</th><th>Height</th><th>Weight</th><th>Code</th>";
  str += "</tr>";

  // Adatok vízszintesen soronként
  for (let i = 0; i < list.length; i++) {
    str += "<tr>";
    str += "<td>" + list[i].id + "</td>";
    str += "<td>" + list[i].name + "</td>";
    str += "<td>" + list[i].height + "</td>";
    str += "<td>" + list[i].weight + "</td>";
    str += "<td>" + list[i].code + "</td>";
    str += "</tr>";
  }

  str += "</table>";

  // Height statisztikák
  let heights = list.map(item => parseFloat(item.height));
  if (heights.length > 0) {
    let sum = heights.reduce((a, b) => a + b, 0);
    let avg = (sum / heights.length).toFixed(2);
    let max = Math.max(...heights);

    str += "<h2>Height statisztika</h2>";
    str += "<p>Összeg: " + sum + "</p>";
    str += "<p>Átlag: " + avg + "</p>";
    str += "<p>Legnagyobb: " + max + "</p>";
  }

  document.getElementById("readDiv").innerHTML = str;
}


async function create() {
  nameStr = document.getElementById("name1").value;
  height = document.getElementById("height1").value;
  weight = document.getElementById("weight1").value;
  if (nameStr.length > 0 && nameStr.length <= 30 && height.length > 0 && height.length <= 30 && weight.length > 0 && weight.length <= 30 && code.length <= 30) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=create&name=" + nameStr + "&height=" + height + "&weight=" + weight
    });
    let data = await response.text();
    if (data > 0)
      str = "Create successful!";
    else
      str = "Create NOT successful!";
    document.getElementById("createResult").innerHTML = str;
    document.getElementById("name1").value = "";
    document.getElementById("height1").value = "";
    document.getElementById("weight1").value = "";
    read();
  }
  else
    document.getElementById("createResult").innerHTML = "Validation error!!";
}

async function getDataForId() {
  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "code=" + code + "&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  for (let i = 0; i < list.length; i++)
    if (list[i].id == document.getElementById("idUpd").value) {
      document.getElementById("name2").value = list[i].name;
      document.getElementById("height2").value = list[i].height;
      document.getElementById("weight2").value = list[i].weight;
    }
}

async function update() {
  id = document.getElementById("idUpd").value;
  nameStr = document.getElementById("name2").value;
  height = document.getElementById("height2").value;
  weight = document.getElementById("weight2").value;
  if (id.length > 0 && id.length <= 30 && nameStr.length > 0 && nameStr.length <= 30 && height.length > 0 && height.length <= 30 && weight.length > 0 && weight.length <= 30 && code.length <= 30) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=update&id=" + id + "&name=" + nameStr + "&height=" + height + "&weight=" + weight
    });
    let data = await response.text();
    if (data > 0)
      str = "Update successful!";
    else
      str = "Update NOT successful!";
    document.getElementById("updateResult").innerHTML = str;
    document.getElementById("idUpd").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("height2").value = "";
    document.getElementById("weight2").value = "";
    read();
  }
  else
    document.getElementById("updateResult").innerHTML = "Validation error!!";
}

async function deleteF() {
  id = document.getElementById("idDel").value;
  if (id.length > 0 && id.length <= 30) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=delete&id=" + id
    });
    let data = await response.text();
    if (data > 0)
      str = "Delete successful!";
    else
      str = "Delete NOT successful!";
    document.getElementById("deleteResult").innerHTML = str;
    document.getElementById("idDel").value = "";
    read();
  }
  else
    document.getElementById("deleteResult").innerHTML = "Validation error!!";
}

window.onload = function () {
  read();
};
