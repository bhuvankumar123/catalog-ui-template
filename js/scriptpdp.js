//function to implement decbouncing
function debounce(func,timeout=3000){
    let timer;
    return (args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this,args);
                        }, timeout);
    };
  }
  //function to implement search
  function search(){
      let searchQuery = document.getElementById("searchquery").value;
      window.location.href = `PLP.html?q=${searchQuery}`;
    }
  //function for user to reset the filters and the search bar  
  function reset(){
      window.location.href = 'PLP.html';
  }
const processChanges = debounce(() => search());
window.onload = function(){
    function safeTraverse(obj, paths = []) {
        let val = obj;
        let idx = 0;

        while (idx < paths.length) {
            if (!val) {
                return null;
            }
            val = val[paths[idx]];
            idx++;
        }
        return val === 0 ? '0' : val;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let prodId = urlParams.get('ProductId')  || "";
    let prodQuery = urlParams.get('q') || "";
    //document.getElementById('searchquery').value = prodQuery;
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
    "unique_id": prodId
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
            //propertyData = data["data"]["properties"]
            propertyData = safeTraverse(data,["data","properties"])
            var propertyMapping = {};
            for (let i = 0;i< propertyData.length;i += 1){
                if(!(propertyData[i]["group"] in propertyMapping)){
                    propertyMapping[propertyData[i]["group"]] = []
                    propertyMapping[propertyData[i]["group"]].push([propertyData[i]["field_id"],propertyData[i]["name"]])
                }
                else{
                    propertyMapping[propertyData[i]["group"]].push([propertyData[i]["field_id"],propertyData[i]["name"]])
                }
            }
            //console.log(dict1)
            //img = data["data"]["catalog_logo_url"]
            img = safeTraverse(data,["data","catalog_logo_url"])
            logo = document.getElementById("logo")
            logo.innerHTML += `<a class="navbar-brand logoimg" href="PLP.html">
            <img src="` + img + `" alt="Logo" class="logoimg">
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
                        //productData = data["data"]["response"]["products"][0];
                        productData = safeTraverse(data,["data","response","products","0"])
                        //console.log(productData)
                        let prodCard = document.getElementById("containerbody");
                        prodCard.innerHTML += `<div class="col-sm-6>
                        <div class="card" id="prodi">
                        <div class="row card-body">
                        <img src="`+productData["productImage"]+`" alt="..." class="col-sm-6 logoimg1">
                        <div class="col-sm-6 basicdetails">
                        <h1 class="centeralign">`+productData["productName"]+`</h1>
                        <hr class="horizontalbreak1">
                        <h2>$`+productData["field_390"]+`</h2>
                        <br>
                        <h4><u>SKU</u>:`+productData["field_337"]+`</h3>
                        <br>
                        <h4><u>Collection</u>:`+productData["field_473"]+`</h3>
                        <br>
                        <h4><u>Taxable</u>:`+productData["field_188"]+`</h3>
                        <br>
                        </div>
                        </div>
                        </div>`

                        let info = document.getElementsByClassName("infotext")[0];
                        let keys = Object.keys(propertyMapping) || [];
                        //console.log(dict1["Variation Options"])
                        //console.log(data[dict1[keys[0]]])
                        /*for (let j=0;j<keys.length;j+=1){
                            console.log(keys[j],data[dict1[keys[j]]])
                            info.innerHTML+=`<p>`+keys[j]`:   `+data[dict1[keys[j]]]+`</p>`;
                        }*/
                        //Displaying Additional Product Information
                        info.innerHTML += '<hr class="horizontalbreak1">'
                        info.innerHTML += '<h1 class="centeralign"><u>Additional Information<u></h1>'
                        info.innerHTML += '<br>'
                        info.innerHTML += '<hr class="horizontalbreak1">'
                        //console.log(keys.length)
                        //let keys = Object.keys(data)
                        for (let j = 0;j<keys.length;j += 1){
                            /*if(keys[j].includes("field")){
                            info.innerHTML+=`<p><b><u>`+dict1[keys[j]]+`</b></u>:`+data[keys[j]];
                            }
                            else{
                            info.innerHTML+=`<p><b><u>`+keys[j]+`</b></u>:`+data[keys[j]];
                            }*/
                            values = propertyMapping[keys[j]] || []
                            const definedValues = []
                            for(let z = 0;z<values.length;z += 1){
                                if (productData[values[z][0]] !== undefined){
                                    definedValues.push(values[z])
                                }
                            }
                            if(definedValues.length > 0){
                                if (keys[j] ==='Properties without any group'){
                                    info.innerHTML += '<u><h3 class="centeralign">Extra Information</h3></u>'
                                    info.innerHTML += '<br>'
                                }
                                else{
                                    info.innerHTML += '<u><h3 class="centeralign">' + keys[j] + '</h3></u>'
                                    info.innerHTML += '<br>'
                                }
                            //console.log(values1)
                                for(let i = 0;i<definedValues.length;i += 1){
                                        info.innerHTML += `<p><b><u>` + definedValues[i][1] + `</b></u>:` + productData[definedValues[i][0]];
                                    }
                                info.innerHTML += '<hr class="horizontalbreak1">'
                            }
                        }
                        info.innerHTML += '<hr class="horizontalbreak1">';
                    })
                })   
        })

      })
    }