const express = require('express');
const fs = require('fs');
const app = express();

const port =4000;
app.use(express.json())

app.get('/',(req,res)=>{
    const content = JSON.parse(fs.readFileSync("cart.json"));
    let totalPrice=0;
for(let i=0;i<content.length;i++){
    totalPrice+=content[i].price;
}
    res.status(200).json({
        message:"Retrieved Data",
        data:content,
        totalPrice:totalPrice

    })
})        
app.get('/getitem/:id',(req,res)=>{
    console.log(req.params)
    id = req.params.id;
    const content = JSON.parse(fs.readFileSync("cart.json"));
    const mathcheddata= content.filter(item=>item.id ==id);
    res.status(200).json({
        message:"Retrieved Data",
        data:mathcheddata
})
})
app.post('/addtocart',(req,res)=>{
    const no_of_items = req.body.no_of_items;
    for(let i = 0; i < no_of_items ; i++){
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const image = req.body.image;
        let itemsArr=JSON.parse(fs.readFileSync('cart.json'));
         itemsArr = [...itemsArr,{id:id,name:name,price:price,description:description,image:image}];
         
        fs.writeFile("cart.json", JSON.stringify(itemsArr), (err)=>{
            if(err)
                return res.status(500).json({
                    message:"something went wrong",
                    error:err
                })
             return res.status(200).json({
                message:"cart added successfully",
                addTocart :{id:id,name:name,price:price,description:description,image:image}
             })
        })
    }
    
})
app.delete('/delete/:id',(req,res)=>{
    const id =req.params.id;
    let itemsArr=JSON.parse(fs.readFileSync('cart.json'));
    itemsArr=itemsArr.filter(items=>items.id !=id);

    fs.writeFile("cart.json", JSON.stringify(itemsArr), (err)=>{
        if(err)
            return res.status(500).json({
                message:"something went wrong",
                error:err
            })
       return res.status(200).json({
        message:"cart item deleted sucessfully",
       })
    })
})
app.put("/updatecart/:id",(req,res)=>{
    var id =req.params.id;
    var {id,name,price,description,image}=req.body;
    let itemsArr=JSON.parse(fs.readFileSync('cart.json'));
    itemsArr=itemsArr.filter(items=>items.id !=id);
    itemsArr = [...itemsArr,{id,name,price,description,image}];

    fs.writeFile("cart.json", JSON.stringify(itemsArr), (err)=>{
        if(err)
            return res.status(500).json({
                message:"something went wrong",
                error:err
            })
       return res.status(200).json({
        message:"cart item updated sucessfully",
       })
    })


})
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})