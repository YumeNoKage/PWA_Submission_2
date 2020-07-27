function hiddenPage1(){
    document.getElementById("page_liga").classList.add("hidden")
    document.getElementById("list_team").classList.remove("hidden")
    // document.getElementById()
}
function hiddenPage2(idBtnBack){
    const ligaReplace = document.getElementById("liga-tabel")

    const divTabelLiga = document.createElement("div");
    divTabelLiga.setAttribute("class","liga");
    divTabelLiga.setAttribute("id","liga-tabel");

    const tableAll = document.createElement("table");
    tableAll.setAttribute("class","white-text")
    const tableHead = document.createElement("thead")
    tableHead.setAttribute("id","header_table")
    const tablebody = document.createElement("tbody");
    tablebody.setAttribute("id","body_table")

    tableAll.appendChild(tableHead);
    tableAll.appendChild(tablebody);

    divTabelLiga.appendChild(tableAll)
    ligaReplace.remove();

    document.getElementById("list_team").insertAdjacentElement("beforeend",divTabelLiga)

    document.getElementById("page_liga").classList.remove("hidden")
    document.getElementById("list_team").classList.add("hidden")

    document.getElementById(`btn-${idBtnBack}`).remove()
    document.getElementById(`btn-back-${idBtnBack}`).remove()
}

function toTableTeam(nomor) {
    return new Promise(function(resolve, reject){
        // const idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(`https://api.football-data.org/v2/competitions/${nomor}/standings`)
            .then(function(response){
                if(response){
                    response.json().then(function(data_team){
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
                                    document.getElementById("body_table").insertAdjacentHTML("beforeend",team_list);
                                })
                                }
                            }
                        })
                        resolve(data_team.standings)
                    })
                }
            })
        
            const createDiv = document.createElement("a");
            createDiv.setAttribute("class","btn-floating btn-large waves-effect waves-light blue darken-1 right icon_sty");
            createDiv.setAttribute("id", `btn-${nomor}`);
            createDiv.setAttribute("onclick",`saveLigaSkor(${nomor});btnToSaveArticle(${nomor})`)
        
            const iconSave = document.createElement("i");
            iconSave.setAttribute("class","material-icons");
            const textSave = document.createTextNode("save");
            iconSave.appendChild(textSave)
        
            createDiv.appendChild(iconSave);
            document.body.insertAdjacentElement("afterend",createDiv);
        
            // Add Back Icon
        
            const btnDiv = document.createElement("div");
            const btnBack = document.createElement("button");
            const iconBtn = document.createElement("i");
            const textBtnBack = document.createTextNode("Kembali");
            const iconBtnName = document.createTextNode("arrow_back");
        
            btnDiv.setAttribute("id",`btn-back-${nomor}`)
        
            btnBack.setAttribute("class","btn waves-effect waves-light blue darken-1");
            btnBack.setAttribute("onclick",`hiddenPage2(${nomor})`);
        
            iconBtn.setAttribute("class","material-icons left");
            iconBtn.appendChild(iconBtnName);
            
            btnBack.appendChild(iconBtn);
            btnBack.appendChild(textBtnBack);
        
            btnDiv.appendChild(btnBack);
        
            document.getElementById("skor-title").insertAdjacentElement("beforeend",btnDiv);
        }

    })
}

function btnToSaveArticle(idBtn){
    console.log("Tombol FAB di klik.");
    fetch(`https://api.football-data.org/v2/competitions/${idBtn}/standings`,{
    method: 'GET',
    mode: 'cors', 
    headers: {
        'X-Auth-Token': '22a7485a55124ebca755db8324323cc7',
        }
    })
    .then(response => response.json())
    .then(data => {

        const div1 = document.createElement("div")
        div1.setAttribute("class","col s12 m6");
        const div2 = document.createElement("div");
        div2.setAttribute("class","card grey darken-2");
        div2.setAttribute("id",`${data.competition.id}`);
        const div3 = document.createElement("div");
        div3.setAttribute("class","card-content");
        const h5_1 = document.createElement("h5");
        h5_1.setAttribute("class","blue-text darken-1");
        const h5_text = document.createTextNode(`${data.competition.name}`);
        h5_1.appendChild(h5_text);

        const span_save = document.createElement("span");
        span_save.setAttribute("class","white-text right");
        const span_text = document.createTextNode(`${data.competition.area.name}`);
        span_save.appendChild(span_text);
        const hr_line = document.createElement("hr");

        const div4 = document.createElement("div");
        const h6_1 = document.createElement("h6");
        h6_1.setAttribute("class","white-text");
        const h6_text = document.createTextNode("Season");
        h6_1.appendChild(h6_text);
        const div5 = document.createElement("div");
        // div_title.setAttribute("class", )
        const p_1 = document.createElement("p");
        p_1.setAttribute("class","white-text");
        const p_1_text = document.createTextNode(`Mulai : ${data.season.startDate}`);
        p_1.appendChild(p_1_text);
        const p_2 = document.createElement("p");
        p_2.setAttribute("class","white-text");
        const p_2_text = document.createTextNode(`Selesai : ${data.season.endDate}`);
        p_2.appendChild(p_2_text);
        const div6 = document.createElement("div");
        div6.setAttribute("class","card-action");
        const btn_info = document.createElement("button");
        btn_info.setAttribute("class","btn waves-effect waves-light blue darken-1");
        btn_info.setAttribute("type","submit");
        btn_info.setAttribute("onclick", `toTableTeam(${data.competition.id}); hiddenPage1();`)
        const btn_info_text = document.createTextNode("Baca Info");
        btn_info.appendChild(btn_info_text);
        
        div6.appendChild(btn_info);

        div5.appendChild(p_1);
        div5.appendChild(p_2);

        div4.appendChild(h6_1);
        div4.appendChild(div5);
        div4.appendChild(div6);

        div3.appendChild(h5_1);
        div3.appendChild(span_save);
        div3.appendChild(hr_line);
        div3.appendChild(div4);

        div2.appendChild(div3);
        
        div1.appendChild(div2)
        document.getElementById("liga_save").insertAdjacentElement("beforeend",div1);
    })
}