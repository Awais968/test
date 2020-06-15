var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course', { useNewUrlParser: true ,useUnifiedTopology : true } )

const Post = mongoose.model('Post', {
    name: String,
    url: String,
    text : String,
   
})

const Comment = mongoose.model('Comment',{
    text: String,
    post: {type: mongoose.Schema.Types.ObjectId, ref : 'Post'}
})

let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.'
  })




  post.save( (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('Post is saved ', post.toJSON())
      }

      let i = 0
      let ca = [{text: 'Cruel…..var { house, mouse} = No type optimization at all'},
    {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
    {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}]
    .forEach ((comment , index, list) =>{
        comment.post = post._id
      const  c = new Comment(comment)
        c.save((error, result) => {
            if (error) return console.error(error);
            
            i++
            console.log(i , list.length)
            if (i == list.length){
                
                queryCommentPost()
            }
        })
    })
  })

  const queryCommentPost = () =>{
    Comment
    .findOne({text : /Cruel/i}, (error, result) =>{
        if (error) console.log(error)
        console.log(result)
    })
    .populate('post')
    .exec(function (err, comment) {
        if (err) console.log(err)
        console.log('The comment is %s', comment)
        mongoose.disconnect()
        process.exit(0)
    })
}
 