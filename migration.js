function migration(data){
    let rows = data.split('\n')
    let props = rows[0].split('\t')
    let final=[]
    for (let i=1;i<rows.length;i++){
        let obj = {}
        let values = rows[i].split('\t')
        props.map((v,index)=>{
            obj[v]=values[index]
        })
        final.push(obj)
    }
    console.log(JSON.stringify(final))
}