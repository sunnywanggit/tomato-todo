let id
function idGenerator(number){
    id = number
    id++
    return id
}

module.exports={
    idGenerator
}