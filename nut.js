const nuts = document.querySelector("#buttons");
const ew = nuts.querySelector("#h");
const h = document.getElementById("d");
let st = document.getElementById("stats").querySelectorAll("h1");
let bn = nuts.querySelectorAll("button");
let gens = h.querySelectorAll("h1");
let nut = new ExpantaNum("2");
let g = [
    g1 = {
    cost: ExpantaNum(100),
    amt: ExpantaNum(1),
    cm: ExpantaNum(1.5),
    },
];
let gr = [
    g1 = {
    cost: ExpantaNum(100),
    amt: ExpantaNum(1),
    cm: ExpantaNum(1.5),
    },
];
let s = [
    r = new ExpantaNum(1),
    p = new ExpantaNum(1)
];
let sn = ["Rebirth","Prestige"];
setInterval(() => {
    nut = ExpantaNum.add(nut,ExpantaNum.pow(g[0].amt,s[0]));
    ew.textContent = nut.toPrecision(3);
    g.forEach((gen , i) => {
    if (i > 0)
    {
        g[i-1].amt = ExpantaNum.add(g[i-1].amt,ExpantaNum.pow(g[i].amt,s[1]));
        if (ExpantaNum.gte(g[i-1].amt,10)) {
             bn[0].textContent = `Cost: ${g[i].cost.toPrecision(3)}`;
         }
    }
    else
    {
        bn[0].textContent = `Cost: ${g[i].cost.toPrecision(3)}`;
    }
    if (ExpantaNum.gt(gen.amt,ExpantaNum(0))) {
        gens[i].hidden = false;
    } else {
        gens[i].hidden = true;
    }
        gens[i].textContent = gen.amt.toPrecision(3);
    });
    st.forEach((stat,i)=>{
        stat.textContent = `${s[i].toPrecision(3)} ${sn[i]}`;
        if (ExpantaNum.gt(s[i],ExpantaNum(1))) {
            stat.hidden = false;
        } else {
            stat.hidden = true;
        }
    });
    bn.forEach((button,i)=>{
        switch (button.id) {
            case "r":
                button.textContent = `Rebirth for ${(ExpantaNum.sub(ExpantaNum.cbrt(ExpantaNum.log10(nut)),1)).toPrecision(3)}`;
                if (ExpantaNum.gte(ExpantaNum.sub(ExpantaNum.cbrt(ExpantaNum.log10(nut)),1),s[0])) {
                    button.hidden = false;
                } else {
                    button.hidden = true;
                }
            break;
            case "p":
                button.textContent = `Prestige for ${(ExpantaNum.cbrt(ExpantaNum.log10(s[0]))).toPrecision(3)}`;
                if (ExpantaNum.gte(ExpantaNum.cbrt(ExpantaNum.log10(s[0])),s[1])) {
                    button.hidden = false;
                } else {
                    button.hidden = true;
                }
            break;
        }
    });
} , 1);
bn.forEach((button,i) => {
    switch (button.id) {
        case "b":
            
            button.addEventListener("click" , () => {
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
                    gr.push({cost:  ExpantaNum.mul(g[g.length-1].cost,ExpantaNum.pow(g[g.length-1].cm,2)) , amt: ExpantaNum(0) , cm: ExpantaNum.add(g[g.length-1].cm,1)});
                    h.insertAdjacentHTML("beforeend",`<h1>0</h1>`);
                    gens = h.querySelectorAll("h1");
                }
            });
            break;
        case "r":
            button.addEventListener("click" , () => {
                s[0] = ExpantaNum.sub(ExpantaNum.cbrt(ExpantaNum.log10(nut)),1);
                nut = ExpantaNum(0);
                g.forEach((gen,i)=>{
                    if (i > 0) {
                        gen.amt = 0;
                    } else {
                        gen.amt = 1;
                    }
                    gen.cost = gr[i].cost;
                });
            })
            break;
        case "p":
            button.addEventListener("click" , () => {
                s[1] = ExpantaNum.cbrt(ExpantaNum.log10(s[0]));
                nut = ExpantaNum(0);
                s[0] = ExpantaNum(1);
                g.forEach((gen,i)=>{
                    if (i > 0) {
                        gen.amt = 0;
                    } else {
                        gen.amt = 1;
                    }
                    gen.cost = gr[i].cost;
                });
            })
        break;
    }
})
