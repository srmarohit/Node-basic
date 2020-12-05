setTimeout(()=>{ console.log("2 second halt")},2000);

const add = (a,b,sum)=>{
     setTimeout(()=>
     {
      const s = a + b ;
     },2000);
          sum(5);

}

add(2,5,(s)=>{console.log(s);});