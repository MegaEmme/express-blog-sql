const connection = require('../data/db');
//CRUD
//index
function index (req,res){

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({ error: 'Post non tovato'});
        res.json(results);
    })
};
//show
function show (req,res){

    const {id} = req.params;

    const postSql = 'SELECT * FROM posts WHERE id = ?';

    const tagsSql = `
        SELECT tags.*
        FROM tags
        JOIN post_tag ON tags.id = post_tag.tag_id
        WHERE post_tag.post_id = ? 
    `;

    connection.query(postSql, [id], (err, postResults) => {
        if(err) return res.status(500).json({error: 'Ricerca Database fallita'});
        if(postResults.length === 0) return res.status(404).json({error: 'Post non trovato'})

        const post = postResults[0];

        connection.query(tagsSql, [id], (err, tagsResults) => {
            if(err) return res.status(500).json({error: 'Ricerca Database fallita'});

            post.tags = tagsResults;
            res.json(post);
        });
    });
};
//store
function store (req,res){
    const newId = connection[connection.length-1].id +1;
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };
    console.log(newPost);
    connection.push(newPost);
    console.log(connection);
    res.status(201).json(newPost);
};
//update
function update (req,res){
    const id = parseInt(req.params.id);
    const post = connection.find(post=>post.id===id);
    if(!post){
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    };
    //prima della modifica
    console.log(post);
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;
    //dopo la modifica
    console.log(post);
    res.json(post);
};
//modify
function modify (req,res){
    const id = parseInt(req.params.id);
    const post = connection.find(post=>post.id===id);
    if(!post){
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    };
    //prima della modifica
    console.log(post);
    if(req.body.title){
        post.title = req.body.title //modifico title
    }
    if(req.body.content){
        post.content = req.body.content //modifico content
    }
    if(req.body.image){
        post.image = req.body.image //modifico image
    }
    if(req.body.tags){
        post.tags = req.body.tags //modifico tags
    }
    //dopo la modifica
    console.log(post);
    res.json(post);    
};
//destroy
function destroy (req,res){

    const {id} = req.params;

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).json({ error: 'Fallita rimozione post'});
        res.sendStatus(204)
    });
};

module.exports = {index, show, store, update, modify, destroy};