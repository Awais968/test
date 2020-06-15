const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })



let bookSchema = mongoose.Schema( {
    name :String,
    published: Boolean,
    createdAt: Date,
    email: String,
    updatedAt: {type: Date, default: Date.now},
    reviews: [mongoose.Schema.Types.Mixed]
})

bookSchema.virtual('authorPhotoUrl')
.get(function(){
    if (!this.email) return null
    var crypto = require('crypto')
    email = this.email
    email = email.trim()
    email = email.toLowerCase()
    var hash = crypto
    .createHash('md5')
    .update('email')
    .digest('hex')
    var gravatarBaseUrl = 'https://secure.gravatar.com/avatar/'
    return gravatarBaseUrl + hash
})

let Book = mongoose.model('Book', bookSchema)
let practicalNodeBook = new Book({
    name : 'Practical Node js 2nd edition',
    author: 'azat',
    link: 'https://github.com/azat-co/node-js',
    createdAt: Date.now(),
    email: 'awais969.za@gmail.com'
})

practicalNodeBook.save((error, results) =>{
    if(error) {
        console.error(error)
        process.exit(1)
         
    } else{
        console.log('Saved:', results)
        console.log('Book author Photo: ' , practicalNodeBook.authorPhotoUrl)
        process.exit(0)
        
        
        }
    }
)