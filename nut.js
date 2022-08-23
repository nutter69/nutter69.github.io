const nuts = document.querySelector("#b");
const ew = document.querySelector("#h");
const h = document.querySelector("#d");
const gens = h.querySelectorAll("h1");
let nut = 2;
let g = [
    g1 = {
    cost: 100,
    amt: 1,
    cm: 1.5,
    },
    g2 = {
        cost: 5000,
        amt: 0,
        cm: 3,
        },
    g3 = {
        cost: 6.9e6,
        amt:0,
        cm:4,
    }
];
setInterval(() => {
    nut += g[0].amt;
    ew.textContent = Math.round(nut).toString();
    g.forEach((gen , i) => {
    if (i > 0)
    {
        g[i-1].amt += g[i].amt / 10;
        if (g[i-1].amt >= 10) {
             nuts.textContent = `Cost: ${Math.round(g[i].cost)}`;
         }
    }
    else
    {
        nuts.textContent = `Cost: ${Math.round(g[i].cost)}`;
    }
        gens[i].textContent = Math.round(gen.amt).toString();
    });
} , 1);
nuts.addEventListener("click" , () => {
    g.forEach((gen , i) => {
        if (i>0)
        {
            if (g[i-1].amt >= 10 && nut >= g[i].cost) {
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
});
