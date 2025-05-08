const posts = require('../data/posts');
//CRUD
//index
function index (req,res){
    // variabile inesistente per prova middleware errori
    // provaerrore(); 
    let filteredPosts = posts;
    if(req.query.tags){
        filteredPosts = posts.filter(post => post.tags.includes(req.query.tags));
    }
    res.json(filteredPosts);
};
//show
function show (req,res){
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        return res.status(404).json({
            error: 'Not Found',
            message: 'Post non trovato'
        });
    };
    res.json(post);
};
//store
function store (req,res){
    const newId = posts[posts.length-1].id +1;
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };
    console.log(newPost);
    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
};
//update
function update (req,res){
    const id = parseInt(req.params.id);
    const post = posts.find(post=>post.id===id);
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
    const post = posts.find(post=>post.id===id);
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
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        res.status(404);
        return res.json({
            status: 404,
            error: 'Not Found',
            message: 'Post non trovato'
        });
    };
    posts.splice(posts.indexOf(post), 1);
    console.log(posts);
    res.sendStatus(204);
};

module.exports = {index, show, store, update, modify, destroy};