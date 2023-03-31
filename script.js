// function to implement debouncing
function debounce(func,timeout=3000){
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this,args);}, timeout);
  };
}
//function to implement search
function search(){
    let searchQuery = document.getElementById("srcq").value;
    window.location.href=`PLP.html?q=${searchQuery}`;
  }
//function to implement filtering based on facets selected by the user
function checkbox(){
  var dict = {}
  var markedcheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
  for (let i=0;i<markedcheckbox.length;i+=1){
    if (!(markedcheckbox[i].className in dict)){
      dict[markedcheckbox[i].className] = [];
      dict[markedcheckbox[i].className].push(markedcheckbox[i].id)
    }
    else if (markedcheckbox[i].className in dict){
      dict[markedcheckbox[i].className].push(markedcheckbox[i].id);
    }
  }
  //console.log(dict)
  var keys = Object.keys(dict);
  var facetquery = [];
  for (let i=0; i<keys.length; i+=1){
    if (dict[keys[i]].length > 1){
      var stri = "";
      for (let j=0;j<dict[keys[i]].length;j+=1){
        if (j==0){
          stri+=(keys[i]);
          stri+=":\\";
          stri+='"';
          stri+=(dict[keys[i]][j]);
          stri+="\\";
          stri+='"';
        }
        else{
          stri+="OR";
          stri+=(keys[i]);
          stri+=":\\";
          stri+='"';
          stri+=(dict[keys[i]][j]);
          stri+="\\";
          stri+='"';
        }
      }
      facetquery.push(stri)
    }
    else if(dict[keys[i]].length = 1){
      var stri="";
          stri+=(keys[i]);
          stri+=":\\";
          stri+='"';
          stri+=(dict[keys[i]][0]);
          stri+="\\";
          stri+='"';
          facetquery.push(String(stri))
    }
  }
  window.location.href=`PLP.html?facets=${facetquery}`
}
// calling search and filtering functions with debouncing
const processChanges = debounce(() => search());
const check = debounce(() => checkbox());
// implementing function for pagination to go back to the previous page
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
// implementing function for pagination to go to next page
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
    // reading the parameters from the url to get the desired products
    let prod_query = urlParams.get('q');
    let pageno = urlParams.get('page');
    let facets = urlParams.get('facets');
    let decoded = decodeURIComponent(facets);
    let count = urlParams.get('count');
    if (count==null){
      count = 20;
    }
    const arr1 = decoded.split(",")
    const arr2=[];
    // changing the facets query to match the syntax required to pass it to the fetch command
    for (let i=0;i<arr1.length;i+=1){
      let newq = arr1[i].replaceAll('\\\"','\"');
      arr2.push(newq)
    }
    if (arr2[0] == "null"){
      arr2.pop()
    }
    //console.log(arr2)
    // Prechecking all the checkboxes which the user clicked so the user is aware of the filters applied
    /*if (arr2 != []){
      console.log('hi')
      var markedcheckbox1 = document.querySelectorAll('input[type="checkbox"]');
      console.log(markedcheckbox1)
      for (var checked of markedcheckbox1){
        checked.checked=true;
      }
      }*/
    // Displaying the search query in the search bar after page reload
    document.getElementById('srcq').value = prod_query;
    if (pageno == null){
      pageno = 1
    }
    //calling the fetch function with the headers to get the catalog products
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
    "facet_filters": arr2,
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
          // displaying the product elements as the form of cards in a bootstrap grid
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
            // calculating the total number of pages based on the total number of products and the count per page and 
            // displaying them 
            numberofprod = data["response"]["numberOfProducts"];
            pagi=document.getElementById('pagi');
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
            // Displaying the filters and their options in the sidebar
            sidebar=document.getElementsByClassName('sidebar')[0];
            facets = data["facets"]
            keys=Object.keys(facets)
            for (ind in keys) {
              var fieldName = document.createElement("div");
      
              fieldName.innerHTML += `
              <p><b>${facets[keys[ind]]["displayName"]}</b></p>
              <form id = "category">
              `
      
              // console.log(fieldName);
              for (let ind2 = 0; ind2 < facets[keys[ind]]["values"].length; ind2 += 2) {
      
                  fieldName.innerHTML += `
                      <input type="checkbox" class="`+facets[keys[ind]]["fieldId"]+`" id="`+facets[keys[ind]]["values"][ind2]+`" onchange=check()>
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