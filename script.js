function debounce(func,timeout=3000){
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this,args);}, timeout);
  };
}
function search(){
    let searchQuery = document.getElementById("srcq").value;
    window.location.href=`PLP.html?q=${searchQuery}`;
  }
const processChanges = debounce(() => search());
function prev(){
  const queryString = new URL(window.location.href)
  pag = queryString.searchParams.get('page')
  queryString.searchParams.delete('page')
          if (pag!=null){
            queryString.searchParams.delete('page')
            var pagval = parseInt(pag) - 1
            queryString.searchParams.append('page',pagval.toString())
            window.location.href=queryString
          }
}

function next(){
  pagurl=new URL(window.location.href)
          pag = pagurl.searchParams.get('page')
          if (pag!=null){
            pagurl.searchParams.delete('page')
            var pagval = parseInt(pag) + 1
            pagurl.searchParams.append('page',pagval.toString())
            window.location.href=pagurl
          }
          else if(pag==null){
          pagval=2  
          pagurl.searchParams.append('page',pagval.toString())
          window.location.href=pagurl
          }
}
window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let prod_query = urlParams.get('q');
    let pageno = urlParams.get('page');
    document.getElementById('srcq').value = prod_query;
    if (pageno == null){
      pageno = 1
    }

    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; connect.sid=s%3ArfsVqhM8NaF8eDe-O0xZ-GCC-BxSNgO7.AeW2wRDrJUNK891rbKv15DAcFiiWaXHoqv5O0fWxj80; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh");
    myHeaders.append("Origin", "https://pim.unbxd.io");
    myHeaders.append("Referer", "https://pim.unbxd.io/catalogueView/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");

    var raw = JSON.stringify({
    "page": pageno,
    "count": 20,
    "facet_filters": [],
    "search_str": prod_query
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef", requestOptions)
    .then(response => {
        response.json().then(data=>{
            let prodcard = document.getElementById("forma")
            products=data["response"]["products"]
            for (let i = 0; i < products.length; i++) {
                prodcard.innerHTML+= `<div class="col md-4 d-flex">
                                    <div class="card">
                                    <img class="card-img-top" src="`+products[i]["productImage"]+`" alt="...">
                                    <div class="card-body">
                                    <h6 class="card-title">`+products[i]["productName"]+`</h6>
                                    <p>UniqueId:`+products[i]["uniqueId"]+`</p>
                  </div>
                </div>
              </div>`

            }

            numberofprod = data["response"]["numberOfProducts"];
            pagi=document.getElementById('pagi');
            var count=20;
            if(Number.isInteger(numberofprod/count)==true){
              datapages=Math.trunc((numberofprod/count))
            }
            else{
              datapages=Math.trunc((numberofprod/count))+1
            }
            if (numberofprod != 0){
            pagi.innerHTML+=`<button id="prev" class="btn btn-secondary" type="text" onclick=prev()>Prev</button>
            <div id="paginfo">
            Page `+pageno+` Of `+datapages+`
            </div>
            <button id="next" class="btn btn-secondary" tyoe="text" onclick=next()>Next</button>`;
            if (pageno == 1){
              document.getElementById('prev').disabled=true;
            }
            if (pageno == datapages){
              document.getElementById('next').disabled=true;
            }
            }
            sidebar=document.getElementsByClassName('sidebar')[0];
            facets = data["facets"]
            keys=Object.keys(facets)
            for (ind in keys) {
              var fieldName = document.createElement("div");
      
              fieldName.innerHTML += `
              <p>${facets[keys[ind]]["displayName"]}</p>
              <form id = "category">
              `
      
              // console.log(fieldName);
              for (let ind2 = 0; ind2 < facets[keys[ind]]["values"].length; ind2 += 2) {
      
                  fieldName.innerHTML += `
                      <input type="checkbox" id="input_checkbox">
                      <label for="categorylabel"> ${facets[keys[ind]]["values"][ind2]}(${(facets[keys[ind]]["values"][ind2+1])})</label><br>
                  `
      
              }
              fieldName.innerHTML += '<hr>';
              fieldName.innerHTML += "</form>";
              sidebar.appendChild(fieldName);
      
          }
        })
    })


}