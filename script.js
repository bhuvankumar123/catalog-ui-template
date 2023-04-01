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
function reset(){
    window.location.href='PLP.html';
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
  for (let i=0; i<keys.length; i+=1){
    for (let j=0;j<dict[keys[i]].length;j+=1){
      var stri = "";
          stri+=(keys[i]);
          stri+=":\\";
          stri+='"';
          stri+=(dict[keys[i]][j]);
          stri+="\\";
          stri+='"';
          facetquery.push(String(stri))
    
    }}
  //console.log(facetquery)
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
    console.log(arr2)
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
            sidebar.innerHTML+='<hr>'
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
              console.log(arr2)
              //checking all the checkboxes displayed which are selected by the user after page reload
              if (arr2.length>0){
                if(arr2[0] != ""){
                var markedcheckbox1 = document.querySelectorAll('input[type="checkbox"]');
                for (var checked of markedcheckbox1){
                  checked.checked=true;
                }}
          }
        
    })
  })
  }