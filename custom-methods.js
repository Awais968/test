const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, {useMongoclient :true})

    const bookSchema = mongoose.Schema({name: String})

    bookSchema.method({
        buy(quantity, customer, callback) {
            var bookToPurchase = this
            console.log('buy')
            return callback()
        },
        refund(customer, callback) {
            console.log('refund')
            return callback()
        }
    })

    bookSchema.static({
        getZeroInventoryReport(callback) {
            console.log('this book is not available')
            let books = []
            return callback(books)
        },
        getCountOfBooksById(boodId, callback) {
            console.log('count of books ')
            let count = 0
            return callback(count)
        }
    })

    let Book = mongoose.model('Books', bookSchema)
    Book.getCountOfBooksById(123, ()=>{})
    Book.getZeroInventoryReport(()=>{})
    
    let practicalNodeBook = new Book({name: 'Practical node.js, 2nd edition'})

    practicalNodeBook.buy(1, 2, ()=>{})
    practicalNodeBook.refund(1, ()=>{})

    bookSchema.post('save', function(next){
        console.log('post save')
        return next()
    })

    bookSchema.pre('remove', function(){
        console.log('pre remove')
        return next()
    })
    practicalNodeBook.save((error, results) =>{
        if(error) {
            console.error(error)
            process.exit(1)
             
        } else{
            console.log('Saved:', results)

            practicalNodeBook.remove((error, results) =>{
                if(error) {
                    console.error(error)
                    process.exit(1)
                     
                } else{
                    console.log('Saved:', results)
                    process.exit(0)
        }
    })
}
    })