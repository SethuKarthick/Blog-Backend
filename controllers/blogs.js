const express = require('express')
const mongoose = require ('mongoose')
const shortid = require ('shortid');

const BlogModel = mongoose.model('Blog') 


let getAllBlog = (req, res) =>{
    BlogModel.find()
       .select('-__v -_id')
       .lean()
       .exec((err, result)=>{
           if(err){
               console.log(err)
               res.send(err)
           }else if(result == undefined || result == null || result == ''){
               console.log("no Blog found")
               res.send("No blog found")
           } else {
               res.send(result)
           }
       })
}

let viewByBlogId = (req, res) => {
    BlogModel.find({'blogId': req.params.blogId}, (err, result)=>{
        if(err){
            console.log(err)
            res.send(err)
        } else if(result == undefined || result == null || result == ""){
            console.log("no blog found");
            res.send("No blog Found");
        } else {
            res.send(result)
        }
    })
}

let createBlog = (req, res) => {
    var today = Date.now()
    let blogId = shortid.generate()
    let newBlog = new BlogModel({
        blogId : blogId,
        title : req.body.title,
        description : req.body.description,
        bodyHtml : req.body.blogBody,
        isPublished : true,
        category : req.body.category,
        author : req.body.fullname,
        created : today,
        lastModified : today

    })

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != "") ? req.body.tags.split(','):[]
    newBlog.tags = tags

    newBlog.save((err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send(result)
        }
    })
}

let editBlog = (req, res) => {
    let options = req.body;
    console.log(options);
    BlogModel.update({'blogId' : req.params.blogId}, options, {multi: true}).exec((err, result) =>{
        if(err){
            console.log(err);
        } else if (result == undefined || result == null || result == ''){
            console.log("no blogs found");
            res.send("no blogs found")
        } else {
            res.send(result)
        }             
    } )
    
}

let increaseBlogView =(req, res) => {
    BlogModel.findOne({'blogId': req.params.blogId}, (err, result)=> {
        if(err){
            console.log(err);
            res.send(err)
        }else if(result==undefined || result == null || result == ''){
            console.log("no blogs found");
            res.send("no blogs found");
        }else {
            result.views += 1;
            result.save(function (err, result){
                if (err){
                    console.log(err);
                    res.send(err);
                }else {
                    console.log("blog updated succesfully");
                    res.send(result);
                }
            })
            
        }
    })
}

let deleteBlog = (req, res) => {
    BlogModel.remove({'blogId': req.params.blogId}, (err, result)=>{
        if(err){
            console.log(err);
            res.send(err); 
        } else if(result == undefined || result == null || result == ''){
            console.log("no blogs found");
            res.send("no blogs found");
        } else {
            res.send(result)
        }
    })
}


module.exports = {
    getAllBlog : getAllBlog,
    createBlog: createBlog,
    viewByBlogId : viewByBlogId,
    // viewByCategory : viewByCategory,
    // viewByAuthor : viewByAuthor,
    editBlog : editBlog,
    deleteBlog : deleteBlog,
    increaseBlogView : increaseBlogView

}