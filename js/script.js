// function to implement debouncing
function debounce(func,timeout=1000){
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this,args);
                        }, timeout);
  };
}
function debounce1(func,timeout=3000){
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
function reset(){
    window.location.href = 'PLP.html';
}
function checkbox(){
  var dict = {}
  var markedCheckBox = document.querySelectorAll('input[type="checkbox"]:checked.filter');
  //console.log(markedCheckBox)
  for (let i=0;i<markedCheckBox.length;i+=1){
    if (!(markedCheckBox[i].name in dict)){
      dict[markedCheckBox[i].name] = [];
      dict[markedCheckBox[i].name].push(markedCheckBox[i].id)
    }
    else if (markedCheckBox[i].name in dict){
      dict[markedCheckBox[i].name].push(markedCheckBox[i].id);
    }
  }
  //console.log(dict)
  var keys = Object.keys(dict) || [];
  var facetQuery = [];
  /* Logic for the First PLP curl
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
  */
 //Updated Logic for the new PLP Curl
  for (let i = 0; i<keys.length; i += 1){
    for (let j = 0;j < dict[keys[i]].length;j += 1){
      var stri = "";
          stri += (keys[i]);
          stri += ":\\";
          stri +='"';
          stri += (dict[keys[i]][j]);
          stri += "\\";
          stri += '"';
          facetQuery.push(String(stri))
    
    }}
  //console.log(facetquery)
  window.location.href = `PLP.html?facets=${facetQuery}`
}
//function to implement filtering based on facets selected by the user
// calling search and filtering functions with debouncing
const processChanges = debounce(() => search());
const check = debounce1(() => checkbox());
// implementing function for pagination to go back to the previous page
function prev(){
  const queryString = new URL(window.location.href)
  pageNumber = queryString.searchParams.get('page')
  queryString.searchParams.delete('page')
          if (pageNumber != null){
            queryString.searchParams.delete('page')
            var pageValue = parseInt(pageNumber) - 1
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href = queryString
          }
}
// implementing function for pagination to go to next page
function next(){
  const queryString = new URL(window.location.href)
          pageNumber = queryString.searchParams.get('page')
          if(pageNumber==null){
            pageValue=2  
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href = queryString
            }
          else if(!(pageNumber == null)){
            queryString.searchParams.delete('page')
            var pageValue = parseInt(pageNumber) + 1
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href=queryString
          }
        }
window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // reading the parameters from the url to get the desired products
    let prodQuery = urlParams.get('q');
    let pageNo = urlParams.get('page');
    let facets = urlParams.get('facets');
    let decoded = decodeURIComponent(facets);
    let count = urlParams.get('count');
    let catalogId = urlParams.get('CatalogID');
    if (catalogId === null){
      catalogId = "642a6751ae38fe17eaa2e37e";
    }
    if (count === null){
      count = 20;
    }
    const facetArray = decoded.split(",")
    const decodedFacetArray = [];
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
    // changing the facets query to match the syntax required to pass it to the fetch command
    for (let i = 0;i < facetArray.length;i += 1){
      let newq = facetArray[i].replaceAll('\\\"','\"');
      decodedFacetArray.push(newq)
    }
    if (decodedFacetArray[0] === "null"){
      decodedFacetArray.pop()
    }
    function safeTraverse(obj, paths = []){
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
    document.getElementById('searchquery').value = prodQuery;
    if (pageNo===null){
      pageNo = 1
    }
    //calling the fetch function with the headers to get the catalog products
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Language", "en-US,en-IN;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "_ga=GA1.2.105997224.1672905386; intercom-device-id-uksd1f47=da87c413-df69-4600-a88f-20abbf241b07; ajs_anonymous_id=b30fef06-dbe2-454e-811e-fb9b802def31; ajs_group_id=3b08979a863b2e61d40ffd40d1fac851; ajs_anonymous_id=b30fef06-dbe2-454e-811e-fb9b802def31; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTA0LTA2IDA1OjE4OjExIFVUQyIsImVtYWlsIjoibmlraGlsLm1pcmFuZGFAdW5ieGQuY29tIiwicmVnaW9ucyI6e319.RZAI6bjpl_RK1gQiThGdmPTG7QaozH1o4JDowzqRO_c; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5pa2hpbC5taXJhbmRhQHVuYnhkLmNvbSIsImV4cGlyeSI6IjIwMjMtMDQtMDkgMDU6MTg6MTEgVVRDIiwidXNlcl9pZCI6IjVlYzYwMWFkNDJjMmMwMDA3ZjQ1MTVjMiIsInRpbWVzdGFtcCI6IjIwMjMtMDMtMzBUMDU6MTg6MTEuMzAxWiJ9.XhzqsaF8dcPAez1nxL-igEC19zOf8ejBFtEz9pQdjKY; intercom-session-uksd1f47=TTBzcUFKL1k5QjdRV21UOFpLdk9IVVE3Ujk4a2hJemc0eVFieWtIL2hodFFyWTNUTExVenM4dzJmVkltLzNmaS0tallWZlI0RG8vemhFM2IweDd1LzJqdz09--e3ac07a812f5d225cd170c9d818fb773a51c8c04; JSESSIONID=Rkx48jzQhXWl9S9SqRJY91z_kRnzR0o-MVjCozkF; connect.sid=s%3A-ROQZBF9tU4JtL3Fq6seX5Ft7AVphFD9.8fTwDOVLRdWwhwYQ8FYHMZnNg0rD4%2Fb4wXhH5oEOtGA; JSESSIONID=mbKHZ9HvduCFMpxty4Y4f-jbttcgXp4rke5DMEDa");
    myHeaders.append("DNT", "1");
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
    "page": pageNo,
    "count": count,
    "facet_filters": decodedFacetArray,
    "search_str": prodQuery
    });
    var requestOption = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://pim.unbxd.io/api/v1/catalogueConfig/6391b1448f93e67002742cef", requestOption)
    .then(response => {
      response.json().then(data=>{
          //console.log(data["data"]["properties"])
          //propertyData = data["data"]["properties"] || [];
          propertyData=safeTraverse(data,["data","properties"])
          var propertyMapping = {};
          for (let i = 0;i < propertyData.length;i += 1){
              propertyMapping[propertyData[i]["name"]] = propertyData[i]["field_id"]
          }
          //imgUrl = data["data"]["catalog_logo_url"]
          imgurl=safeTraverse(data,["data","catalog_logo_url"])
            logo = document.getElementById("logo")
            logo.innerHTML += `<a class="navbar-brand" href="PLP.html">
            <img class="logoimg" src="` + imgurl + `" alt="Logo">
          </a>`
          //console.log(dict1)
      })
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef", requestOptions)
    .then(response => {
        response.json().then(data=>{
          document.getElementsByClassName('lds-ellipsis')[0].style.display="None"
          // displaying the product elements as the form of cards in a bootstrap grid
            let prodCard = document.getElementById("forma")
            //products = data["response"]["products"] || [];
            products=safeTraverse(data,["response","products"])
            for (let i = 0; i < products.length; i++) {
              if(products[i]["productImage"] === undefined){
                prodCard.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex">
                <div class="card">
                <img class="card-img-top" src="img-not-available.png" alt="...">
                <div class="card-body">
                <h6 class="card-title">`+products[i]["productName"]+`</h6>
                <a href="/pdp.html?ProductId=`+products[i]["uniqueId"]+`" class="align-self-end btn btn-light stretched-link view">View</a>
</div>
</div>
</div>`
              }
              else{
                prodCard.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex">
                <div class="card">
                <img class="card-img-top" src="`+products[i]["productImage"][0]+`" alt="...">
                <div class="card-body plp">
                <h6 class="card-title">`+products[i]["productName"]+`</h6>
                <a href="/pdp.html?ProductId=`+products[i]["uniqueId"]+`" class="align-self-end btn btn-light stretched-link view">View</a>
</div>
</div>
</div>`
              }


            }
            // calculating the total number of pages based on the total number of products and the count per page and 
            // displaying them 
            //numberOfProd = data["response"]["numberOfProducts"];
            numberOfProd=safeTraverse(data,["response","numberOfProducts"])
            pagi = document.getElementsByClassName('pagi')[0];
            if(Number.isInteger(numberOfProd/count)===true){
              dataPages = Math.trunc((numberOfProd/count))
            }
            else{
              dataPages = Math.trunc((numberOfProd/count))+1
            }
            if (numberOfProd !== 0){
            pagi.innerHTML += `<button id="prev" class="btn btn-light prev" type="text" onclick=prev()>Prev</button>
            <div id="paginfo">
            Page `+pageNo+` Of `+dataPages+`
            </div>
            <button id="next" class="btn btn-light next" tyoe="text" onclick=next()>Next</button>`;
            if (pageNo == 1){
              document.getElementById('prev').disabled = true;
            }
            if (pageNo == dataPages){
              document.getElementById('next').disabled = true;
            }
            }
            if(pageNo == 1 && pageNo == dataPages){
              document.getElementsByClassName('pagi')[0].style.display="None";
            }
            // Displaying the filters and their options in the sidebar
            sideBar = document.getElementsByClassName('sidebar')[0];
            facets = data["facets"] || {};
            keys = Object.keys(facets) || [];
            sideBar.innerHTML += '<h5 class="centeralign">Filters</h5>'
            for (ind in keys) {
              var fieldName = document.createElement("div");
              fieldName.className="facetfilters";
      
              fieldName.innerHTML += `
              <p><b>${facets[keys[ind]]["displayName"]}</b></p>
              <form id = "category">
              `
      
              // console.log(fieldName);
              for (let ind2 = 0; ind2 < facets[keys[ind]]["values"].length; ind2 += 2) {
      
                  fieldName.innerHTML += `
                      <input type="checkbox" class="filter" name="`+facets[keys[ind]]["fieldId"]+`" id="`+facets[keys[ind]]["values"][ind2]+`" onchange=check()>
                      <label for="categorylabel"> ${facets[keys[ind]]["values"][ind2]}(${(facets[keys[ind]]["values"][ind2+1])})</label><br>
                  `
      
              }
              //fieldName.innerHTML += '<hr class="horizontalbreak2">';
              fieldName.innerHTML += "</form>";
              sideBar.appendChild(fieldName);
              sideBar.innerHTML += '<hr class="horizontalbreak2">';
            }
              //console.log(arr2)
              //checking all the checkboxes displayed which are selected by the user after page reload
              if (decodedFacetArray.length > 0){
                if(decodedFacetArray[0] !== ""){
                var markedCheckBox1 = document.querySelectorAll('input[type="checkbox"].filter');
                for (var checked of markedCheckBox1){
                  checked.checked=true;
                }}
                else if(decodedFacetArray[0] ==""){
                  document.getElementById("reset").disabled=true
                }
          }
          else{
            document.getElementById("reset").disabled=true
          }
    })
  })
  }