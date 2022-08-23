const nuts = document.querySelector("#b");
const ew = document.querySelector("#h");
const h = document.getElementById("d");
let gens = h.querySelectorAll("h1");
let nut = new ExpantaNum("2");
let g = [
    g1 = {
    cost: ExpantaNum(100),
    amt: ExpantaNum(1),
    cm: ExpantaNum(1.5),
    },
];
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
    nut = ExpantaNum.add(nut,g[0].amt);
    ew.textContent = nut.toPrecision(3);
    g.forEach((gen , i) => {
    if (i > 0)
    {
        g[i-1].amt = ExpantaNum.add(g[i-1].amt,g[i].amt);
        if (ExpantaNum.gte(g[i-1].amt,10)) {
             nuts.textContent = `Cost: ${g[i].cost.toPrecision(3)}`;
         }
    }
    else
    {
        nuts.textContent = `Cost: ${g[i].cost.toPrecision(3)}`;
    }
        gens[i].textContent = gen.amt.toPrecision(3);
    });
} , 1);
nuts.addEventListener("click" , () => {
    g.forEach((gen , i) => {
        if (i>0)
        {
            if (ExpantaNum.gte(g[i-1].amt,10) && ExpantaNum.gte(nut,g[i].cost) && ExpantaNum.lt(g[i].amt,10)) {
                nut = ExpantaNum.sub(nut,g[i].cost);
                g[i].cost = ExpantaNum.mul(g[i].cost,g[i].cm);
                g[i].amt = ExpantaNum.add(g[i].amt,1);
            }
        }
        else
        {
            if (ExpantaNum.gte(nut,g[i].cost) && ExpantaNum.lt(g[i].amt,10))
            {
                nut = ExpantaNum.sub(nut,g[i].cost);
                g[i].cost = ExpantaNum.mul(g[i].cost,g[i].cm);
                g[i].amt = ExpantaNum.add(g[i].amt,1);
            }
        }
    });
    if (ExpantaNum.gte(g[g.length-1].amt,10)) {
        let newg = {cost:  ExpantaNum.mul(g[g.length-1].cost,ExpantaNum.pow(g[g.length-1].cm,2)) , amt: ExpantaNum(0) , cm: ExpantaNum.add(g[g.length-1].cm,1)};
        g.push(newg);
        h.insertAdjacentHTML("beforeend",`<h1>0</h1>`);
        gens = h.querySelectorAll("h1");
    }
});
