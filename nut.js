const nuts = document.querySelector("#b");
const ew = document.querySelector("#h");
const h = document.getElementById("d");
let gens = h.querySelectorAll("h1");
const addr = document.querySelector("#ip");
let nut = 2;
let ip = ""
let g = [
    g1 = {
    cost: 100,
    amt: 1,
    cm: 1.5,
    },
];
function getip() {
    fetch('https://api.ipify.org/?format=json')
.then(ipnut => ipnut.json())
.then(data => addr.textContent = data.ip)
return addr.textContent;
}
ip = getip();
console.log(ip);
function short(x) {
    let a = ["M","B","T","Qa","Qi","Sx","Sp","Oc","No"];
    let b = ["","U","D","T","Qu","Qi","Sx","Sp","Oc","No"];
    let c = ["","De","Vg","Tg","Qug","Qig","Sxg","Spg","Ocg","Nog","Ce"]
    let p = "";
    let px = "";
    let dec = x;
    if (Math.floor(Math.log10(x)) < 6) {
        switch (Math.floor(Math.log10(x))) {
            case 0:
            px = dec.substring(0,1);
            return `${px}`;
            break;
            case 1:
                px = dec.substring(0,2);
                return `${px}`;
                break;
                case 2:
                    px = dec.substring(0,3);
                    return `${px}`;
                    break;
                    case 3:
                        p = dec.substring(1,4);
                        px = dec.substring(0,1);
                        return `${px},${p}`;
                        break;
                        case 4:
                            p = dec.substring(2,5);
                            px = dec.substring(0,2);
                            return `${px},${p}`;
                            break;
                            case 5:
                                p = dec.substring(3,6);
                                px = dec.substring(0,3);
                                return `${px},${p}`;
                                break;
        }
    }
    else if (Math.floor(Math.log10(x)) < 18)
    {
        switch (Math.floor(Math.log10(x)) % 3) {
            case 0:
            p = dec.substring(1,4);
            px = dec.substring(0,1);
            break;
            case 1:
                p = dec.substring(2,4);
                px = dec.substring(0,2);
                break;
                case 2:
                    p = dec.substring(3,4);
                    px = dec.substring(0,3);
                    break;
        }
        return `${px}.${p} ${a[Math.floor(Math.log10(x)/3)-2]}`;
    }
    else
    {
        switch (Math.floor(Math.log10(x)) % 3) {
            case 0:
            p = dec.substring(2,5);
            px = dec.substring(0,1);
            break;
            case 1:
                p = dec.substring(2,3);
                px = dec.substring(0,1);
                px = px.concat(p);
                p = dec.substring(3,5);
                break;
                case 2:
                    p = dec.substring(2,4);
                    px = dec.substring(0,1);
                    px = px.concat(p);
                    p = dec.substring(4,5);
                    break;
        }
        return `${px}.${p} ${b[Math.floor(Math.log10(x)/3)%10]}${c[Math.floor(Math.log10(x)/30)]}`;
    }
}
setInterval(() => {
    nut += g[0].amt;
    ew.textContent = short(nut.toString());
    g.forEach((gen , i) => {
    if (i > 0)
    {
        g[i-1].amt += g[i].amt / 10;
        if (g[i-1].amt >= 10) {
             nuts.textContent = `Cost: ${short(g[i].cost.toString())}`;
         }
    }
    else
    {
        nuts.textContent = `Cost: ${short(g[i].cost.toString())}`;
    }
        gens[i].textContent = short(gen.amt.toString());
    });
} , 1);
nuts.addEventListener("click" , () => {
    g.forEach((gen , i) => {
        if (i>0)
        {
            if (g[i-1].amt >= 10 && nut >= g[i].cost && g[i].amt < 10) {
                nut -= g[i].cost;
                g[i].cost *= g[i].cm;
                g[i].amt++;
            }
        }
        else
        {
            if (nut >= g[i].cost && g[i].amt < 10)
            {
                nut -= g[i].cost;
                g[i].cost *= g[i].cm;
                g[i].amt++;
            }
        }
    });
    if (g[g.length-1].amt >= 10) {
        let newg = {cost: g[g.length-1].cost * Math.pow(g[g.length-1].cm , 5) , amt: 0 , cm: g[g.length-1].cm + 1};
        g.push(newg);
        h.insertAdjacentHTML("beforeend",`<h1>0</h1>`);
        gens = h.querySelectorAll("h1");
    }
});
