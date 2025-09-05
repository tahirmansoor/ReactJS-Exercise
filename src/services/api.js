export async function fetchPostsAndUsers() {
const [postsRes, usersRes] = await Promise.all([
fetch('https://jsonplaceholder.typicode.com/posts'),
fetch('https://jsonplaceholder.typicode.com/users'),
])
const [posts, users] = await Promise.all([postsRes.json(), usersRes.json()])
return { posts, users }
}