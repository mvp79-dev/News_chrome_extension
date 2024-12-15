if(typeof window.apo_ex == "undefined"){
    window.apo_ex = true;

    const _tag = e => { return document.getElementsByTagName(e) }
    const _id = e => { return document.getElementById(e) }
    const _cre = e => { return document.createElement(e) }
    const _cll = e => { return document.getElementsByClassName(e) }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let apoex_s = 1;
    
    let _gp = () => {
        let a = {};
        if(location.hash){
            let b = location.hash.split('?');
            if(b[1]){
                let c = b[1].split('&');
                for(let d in c){
                    let e = c[d].split('=');
                    if(e.length >= 2){
                        let f=e[0],g=e[1];
                        if(f.indexOf('[]') > -1){
                            let h = f.replace('[]','');
                            if(!a[h]){
                                a[h] = [];
                            }
                            a[h].push(g);
                        }else{
                            a[f] = g;
                        }
                    }
                }
            }
        }
        return a;
    }

    window.apoex_start = () => {

        if(!_id('gl_fn').value){
            alert('Plase enter filename to save');
            return false;
        }

        if(!localStorage.getItem('_apoex') || localStorage.getItem('_apoex') != 'run'){
            console.log('_apoex disabled');
            _id('_apoex_start').disabled = false;
            _id('_apoex_start').innerHTML = 'Export Contacts';
            return false;
        }
        _id('_apoex_start').disabled = true;
        _id('_apoex_start').innerHTML = 'Exporting page '+apoex_s;

        let gp = _gp();
        gp.per_page = 100;
        gp.page = apoex_s;
        gp.show_suggestions = false;
        gp.finder_version = 1;
        gp.display_mode = "explorer_mode";
        gp.contact_label_ids = gp.contactLabelIds;
        gp.finder_view_id = gp.finderViewId;
        gp.prospected_by_current_team = gp.prospectedByCurrentTeam;

        delete gp.contactLabelIds;
        delete gp.finderViewId;
        delete gp.prospectedByCurrentTeam;

        // let pp = JSON.stringify(gp);
        // console.log(pp);

        let npp = {
            "finder_view_id": "6674b20eecfedd000184539f",
            "contact_label_ids": [
                "6693b448fc470100019a89f2"
            ],
            "prospected_by_current_team": [
                "yes"
            ],
            "per_page": 100,
            "page": 1,
            "display_mode": "explorer_mode",
            "show_suggestions": false,
            "finder_version": 1,
        };
        npp.contact_label_ids = gp.contact_label_ids;
        npp.finder_view_id = gp.finder_view_id;
        let pp = JSON.stringify(gp);
        
        fetch("https://app.apollo.io/api/v1/mixed_people/search", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://app.apollo.io/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": pp,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(a=>{
            return a.json()
        }).then(a=>{
            if(a.contacts&&a.contacts.length){
                let b = a.contacts;
                let props = [];
                for(let i in b){
                    let c = b[i];
                    let d = {};
                    d.id = c.id;
                    d.first_name = c.first_name;
                    d.last_name = c.last_name;
                    d.email = c.email;
                    d.title = c.title;
                    d.linkedin_url = c.linkedin_url;
                    d.organization = '';
                    d.organization_linkedin = '';
                    d.phone_numbers = '';
                    if(c.organization){
                        d.organization = c.organization.name;
                        d.organization_linkedin = c.organization.linkedin_url;
                    }
                    if(c.phone_numbers&&c.phone_numbers.length){
                        let nn = [];
                        for(let z in c.phone_numbers){
                            let x = c.phone_numbers[z];
                            nn.push(x.sanitized_number);
                        }
                        d.phone_numbers = nn.join(',');
                    }
                    props.push(d);
                }
                //console.log(props);
                // apoex_s++;
                // apoex_start();
                let n = new XMLHttpRequest();
                let nf = new FormData();
                nf.append('props',JSON.stringify(props));
                // if(a.breadcrumbs.length){
                //     try{
                //         let ss = a.breadcrumbs[0].display_name;
                //         nf.append('fn',a.breadcrumbs[0].display_name);
                //     }catch(e){}
                // }
                nf.append('fn',_id('gl_fn').value);
                n.onreadystatechange=function(){
                    if(n.readyState===4){
                        let r = JSON.parse(n.responseText);
                        apoex_s++;
                        apoex_start();
                    }
                }
                n.open('POST','https://phpstack-1335745-4931364.cloudwaysapps.com/apollo/index.php',true);
                n.send(nf);
            }else{
                alert('Done');
                _id('gl_ddl').click();
            }
        });
    }
    //apoex_start();
    let gbb = _cre('div'),gb=_cre('button'),gl_dl=_cre('button');

    let gl_fn = _cre('input');
    gl_fn.type = 'text';
    gl_fn.id = 'gl_fn';
    gl_fn.setAttribute('style','margin-right:10px');
    gl_fn.placeholder = 'File Name';
    gbb.appendChild(gl_fn);


    gbb.appendChild(gb);
    gb.innerHTML = 'Export Contacts';
    gb.setAttribute('data-old',gb.innerText);
    gbb.setAttribute('style','position: fixed;bottom: 0px;display: flex;justify-content: center;align-items: center;width: 100%;padding-bottom:20px;');
    gb.setAttribute('style','margin-right:10px;');
    gb.id = '_apoex_start';
    //gb.disabled = true;
    gb.addEventListener('click',()=>{
        apoex_s = 1;
        localStorage.setItem('_apoex','run');
        apoex_start();
    });

    gl_dl.id = '_apoex_stop_b';
    gl_dl.innerHTML = 'Stop';
    gl_dl.setAttribute('style','margin-right:10px');
    gl_dl.addEventListener('click',()=>{
        localStorage.setItem('_apoex','no');
        alert('Stopped');
    });
    gbb.appendChild(gl_dl);

    let gl_ddl = _cre('button');
    gl_ddl.type = 'button';
    gl_ddl.id = 'gl_ddl';
    gl_ddl.innerHTML = 'Download';
    gl_ddl.addEventListener('click',()=>{
        if(!_id('gl_fn').value){
            alert('Please enter file name');
        }else{
            window.open('https://phpstack-1335745-4931364.cloudwaysapps.com/apollo/dl.php?fn='+_id('gl_fn').value,'_blank');
        }
    });
    gbb.appendChild(gl_ddl);


    document.body.appendChild(gbb);
}