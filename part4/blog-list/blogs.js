const blogsRouter = require('express').Router();
const { notStrictEqual } = require('assert');
const Blog = require('./models/blog');


blogsRouter.get('/', (req, resp) => {
  Blog.find({})
    .then((blogs) => resp.json(blogs));
});

blogsRouter.get('/:id', (req, resp, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (blog) resp.json(blog);
      else resp.status(404);
    })
    .catch((err) => next(error));
});


blogsRouter.post('/', (req, resp, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    snippet: body.snippet, 
    body: body.body,
    tags: body.tags,
  });

 
  blog.save()
    .then((savedBlog) => resp.json(savedBlog))
    .cathc((err) => next(err));
});


blogsRouter.delete('/:id', (req, resp, next) => {
  const id = req.params.id;


  Blog.findByIdAndRemove(id)
  // TODO: check whether the implementation works
  .then(() => resp.status(204).send())
  .catch((err) => next(err))

});


blogsRouter.put('/:id', (req, resp, next) => {
  const id = req.params.id;

  const body = req.body;


  const blog = {
    title: body.title,
    snippet: body.snippet, 
    body: body.body,
    tags: body.tags,
  };


  Blog.findByIdAndUpdate(id, blog, { new: true })
    .then((updatedBlog => resp.json(updatedBlog)))
    .catch((err) => next(err));
});





module.exports = blogsRouter;