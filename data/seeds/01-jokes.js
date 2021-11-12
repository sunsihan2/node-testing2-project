exports.seed=function(knex){
    return knex("jokes").insert([
        {
            description: "my jokes",
            photos: " super nice photo here"
        },
        {
            description: "my jokes2",
            photos: " super nice photo here"
        },
        {
            description: "my jokes3",
            photos: " super nice photo here"
        }
    
    ])
}