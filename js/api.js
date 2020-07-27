const liga = ["2001","2002","2003","2014","2015","2021"]

liga.forEach(element => {
    fetch(`https://api.football-data.org/v2/competitions/${element}/standings`,{
        method: 'GET',
        mode: 'cors', 
        headers: {
            'X-Auth-Token': '22a7485a55124ebca755db8324323cc7',
            }
        })
        .then(response => response.json())
        .then(data => {
            const data_liga = `
            <div class="col s12 m6">
                <div class="card grey darken-2" id=${data.competition.id}>
                    <div class="card-content">
                        <h5 class="blue-text darken-1">${data.competition.name}</h5>
                        <span class="white-text right">${data.competition.area.name}</span>
                        <hr>
                        <div>
                            <h6 class="white-text">Season</h6>
                            <div>
                                <p class="white-text">Mulai &nbsp; &nbsp; : ${data.season.startDate}</p>
                                <p class="white-text">Selesai &nbsp; : ${data.season.endDate}</p>
                            </div>
                            <div class="card-action">
                                <button class="btn waves-effect waves-light blue darken-1" type="submit" onclick="toTableTeam(${data.competition.id}); hiddenPage1();">Baca Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById("liga").insertAdjacentHTML("beforeend",data_liga)
        })
});

