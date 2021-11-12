exports.seed= async knex => {
    await knex("jokes").truncate();
}