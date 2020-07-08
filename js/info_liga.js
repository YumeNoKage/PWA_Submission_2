function hiddenPage1(){
    document.getElementById("page_liga").classList.add("hidden")
    document.getElementById("list_team").classList.remove("hidden")
}
function hiddenPage2(){
    document.getElementById("page_liga").classList.remove("hidden")
    document.getElementById("list_team").classList.add("hidden")
}

function toTableTeam(nomor) {
    fetch(`https://api.football-data.org/v2/competitions/${nomor}/standings`,{
    method: 'GET',
    mode: 'cors', 
    headers: {
        'X-Auth-Token': '22a7485a55124ebca755db8324323cc7',
        }
    })
    .then(response => response.json())
    .then(data_team => {
        console.log()
        data_team.standings
        .map( team_list => {
            if (nomor == 2001 && team_list.type === "TOTAL"){
                const group = `
                    <td colspan="10">
                        <h4>${team_list.group}</h3>
                    </td>
                    <tr>
                        <th>No</th>
                        <th>Team</th>
                        <th>M</th>
                        <th>M</th>
                        <th>S</th>
                        <th>K</th>
                        <th>GM</th>
                        <th>GK</th>
                        <th>+/-</th>
                        <th>P</th>
                    </tr>
                `
                document.getElementById("body_table").insertAdjacentHTML("beforeend",group)                
                team_list.table
                    .forEach( team_data => {
                    const url = team_data.team.crestUrl.replace(/^http:\/\//i, 'https://');
                    const team = `
                        <tr>
                            <td>${team_data.position}</td>
                            <td>${team_data.team.name}<i class="right"><img src="${url}" class="icon-team" alt="${team_data.team.name}"></img></i></td>
                            <td>${team_data.playedGames}</td>
                            <td>${team_data.won}</td>
                            <td>${team_data.draw}</td>
                            <td>${team_data.lost}</td>
                            <td>${team_data.points}</td>
                            <td>${team_data.goalsFor}</td>
                            <td>${team_data.goalsAgainst}</td>
                            <td>${team_data.goalDifference}</td>
                        </tr>
                    `;
                    document.getElementById("body_table").insertAdjacentHTML("beforeend",team)
                    })
                } else {
                if (team_list.type === "TOTAL"){
                    const group = `
                        <tr>
                            <th>No</th>
                            <th>Team</th>
                            <th>M</th>
                            <th>M</th>
                            <th>S</th>
                            <th>K</th>
                            <th>GM</th>
                            <th>GK</th>
                            <th>+/-</th>
                            <th>P</th>
                        </tr>
                    `
                    document.getElementById("body_table").insertAdjacentHTML("beforeend",group)
                team_list.table
                .forEach( team_data => {
                    url = team_data.team.crestUrl.replace(/^http:\/\//i, 'https://');
                    const team_list = `
                        <tr>
                            <td>${team_data.position}</td>
                            <td>${team_data.team.name}<i class="right"><img src="${url}" class="icon-team" alt="${team_data.team.name}"></img></i></td>
                            <td>${team_data.playedGames}</td>
                            <td>${team_data.won}</td>
                            <td>${team_data.draw}</td>
                            <td>${team_data.lost}</td>
                            <td>${team_data.points}</td>
                            <td>${team_data.goalsFor}</td>
                            <td>${team_data.goalsAgainst}</td>
                            <td>${team_data.goalDifference}</td>
                        </tr>
                    `;
                    document.getElementById("body_table").insertAdjacentHTML("beforeend",team_list)
                })
                }
            }
        })
        // console.log(data_team.standings)
    })
}

document.addEventListener("DOMContentLoaded", function() {
    // Tambakan baris kode di bawah
        var save = document.getElementById("save");
        save.onclick = function() {
        console.log("Tombol FAB di klik.");
        }
});