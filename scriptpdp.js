//function to implement decbouncing
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
  //function for user to reset the filters and the search bar  
  function reset(){
      window.location.href='PLP.html';
  }
const processChanges = debounce(() => search());
window.onload = function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let prodid = urlParams.get('ProductId')
    let prod_query = urlParams.get('q');
    document.getElementById('srcq').value = prod_query;
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
    "catalogue_id": "6391b1448f93e67002742cef",
    "unique_id": prodid
    });

    var requestOption = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      //Creating a mapping dictionary between the field_id and the names
      fetch("https://pim.unbxd.io/api/v1/catalogueConfig/6391b1448f93e67002742cef", requestOption)
      .then(response => {
        response.json().then(data=>{
            //console.log(data["data"]["properties"])
            data1=data["data"]["properties"]
            var dict1 = {};
            for (let i=0;i<data1.length;i+=1){
                if(!(data1[i]["group"] in dict1)){
                    dict1[data1[i]["group"]]=[]
                    dict1[data1[i]["group"]].push([data1[i]["field_id"],data1[i]["name"]])
                }
                else{
                    dict1[data1[i]["group"]].push([data1[i]["field_id"],data1[i]["name"]])
                }
            }
            //console.log(dict1)
            img=data["data"]["catalog_logo_url"]
            logo=document.getElementById("logo")
            logo.innerHTML+=`<a class="navbar-brand" href="PLP.html">
            <img src="`+img+`" alt="Logo" id="logoimg" style="width:100px;">
          </a>`
            //console.log(dict1)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
            //Displaying the product details
                fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueProduct", requestOptions)
                .then(response => {
                    response.json().then(data=>{
                        data=data["data"]["response"]["products"][0];
                        let prodcard = document.getElementById("containerbody");
                        prodcard.innerHTML+=`<div class="col-sm-6>
                        <div class="card" id="prodi">
                        <div class="row card-body">
                        <img src="`+data["productImage"]+`" alt="..." class="col-sm-6">
                        <div class="col-sm-6">
                        <h1>`+data["productName"]+`</h1>
                        <hr>
                        <h2>$`+data["field_390"]+`</h2>
                        <br>
                        <p>`+data["field_476"]+`</p>
                        </div>
                        </div>
                        </div>`

                        let info = document.getElementById("infotext");
                        let keys = Object.keys(dict1)
                        console.log(dict1["Variation Options"])
                        //console.log(data[dict1[keys[0]]])
                        /*for (let j=0;j<keys.length;j+=1){
                            console.log(keys[j],data[dict1[keys[j]]])
                            info.innerHTML+=`<p>`+keys[j]`:   `+data[dict1[keys[j]]]+`</p>`;
                        }*/
                        //Displaying Additional Product Information
                        info.innerHTML+='<hr>'
                        info.innerHTML+='<h1><u>Additional Information<u></h1>'
                        info.innerHTML+='<br>'
                        console.log(keys.length)
                        //let keys = Object.keys(data)
                        for (let j=0;j<keys.length;j+=1){
                            /*if(keys[j].includes("field")){
                            info.innerHTML+=`<p><b><u>`+dict1[keys[j]]+`</b></u>:`+data[keys[j]];
                            }
                            else{
                            info.innerHTML+=`<p><b><u>`+keys[j]+`</b></u>:`+data[keys[j]];
                            }*/
                            values=dict1[keys[j]]
                            const values1=[]
                            for(let z=0;z<values.length;z+=1){
                                if (data[values[z][0]]!==undefined){
                                    values1.push(values[z])
                                }
                            }
                            if(values1.length>0){
                                info.innerHTML+='<h3>'+keys[j]+'</h3>'
                                info.innerHTML+='<br>'
                            }
                            console.log(values1)
                            for(let i=0;i<values1.length;i+=1){
                                    info.innerHTML+=`<p><b><u>`+values1[i][1]+`</b></u>:`+data[values1[i][0]];
                                }
                        }
                        info.innerHTML+='<hr>';
                    })
                })   
        })
      })
}