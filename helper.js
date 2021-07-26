



export async function getPolls(client, filter) {
    const result = await client.db("contestant").collection("poll").find(filter).toArray();
    console.log("successfully found all contentant", result);
    return result;
}
export async function getPollById(client, id) {
    const result = await client.db("contestant").collection("poll").findOne({ id: id });
    console.log("successfully found poll by id", result);
    return result;
}
export async function deletePollById(client, id) {
    const result = await client.db("contestant").collection("poll").deleteOne({ id: id });
    console.log("successfully delete poll by id", result);
    return result;
}
export async function insertPoll(client, polls) {
    const result = await client.db("contestant").collection("poll").insertMany(polls);
    console.log("successfully inserted", result);
    return result;
}
