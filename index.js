const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
// Redis Config
const client = require("./Config/Redis");
const mongo = require('mongodb');
const collection = require('./Config/MongoDB');


app.use(bodyParser.json())

app.get('/', async  (req, res) => {
    const {key} = req.body

    try{
        const value = await client.GET(`${key}`)
        res.send(value)
    }catch(e){
        res.send({msg:'Nenhuma chave com esse valor',key:key})
    }
    
})

app.post('/adicionar',async (req,res)=>{

    const {data} = req.body
    try{
        const insertResult = await collection.insertOne({data:data})
        const id = insertResult.insertedId
        client.set(`${id}`,data)
        res.send({msg:'Cadastrado com sucesso',id:`Esse é o id para o CRUD e para pesquisar no redis:${id}`})
    }catch(e){
        res.send(e)
    }
})

app.put('/atualizar/:id',async (req,res)=>{
    const id = req.params
    const {data} = req.body

    try{
        const updateResult = await collection.updateOne({_id: mongo.ObjectId(id)},{$set:{data: `${data}`}});
        client.set(`${id.id}`,data)
        res.send({msg:'Atualizado com sucesso!'})
    }catch(e){
        res.send({msg:'Nenhum dado encotrado'})
    }
})

app.delete('/deletar/:id',async (req,res)=>{

    const {id} = req.params
    try{
        const deleteResult = await collection.deleteOne({_id: mongo.ObjectId(id)});
        if(deleteResult.deletedCount > 0 ){
            res.send({msg:'Deletado com sucesso!'})
        }else{
            res.send({msg:'Nenhum dado encotrado com esse valor'})
        }
        
    }catch(e){
        res.send(e)
    }
    
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})