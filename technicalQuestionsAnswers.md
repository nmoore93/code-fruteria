1. I spent around 6 hours on the challenge

2. I added the likes of eslint and prettier. With more time I would address the issues these tools found, mainly the use of 'any' throughout the project. I would also choose one styling approach. Currently there is a mix of css, less and inline styles. I would look at one tool for styling such as tailwind, css modules or sass modules. For testing I believe a few of the components such as the drag and dropping focussed ones would benefit from the likes of playwright testing. Below is a list of some areas I would look to improve with more time:

- Address remaining eslint/prettier warnings and errors. Especially the use of any that remains
- Other useful static analysis tools I would look to bring in are perfectionist (used to apply consistent code style and ordering for things like props) and knip (used to find unused code and files)
- Would look to make use of one styling tool as much as possible. Whether this was something like tailwind, SASS or CSS modules I think it would benefit from a single approach for consistency.
- Bring in playwright style testing for things like the drag and drop behavior as I believe it gives more confidence for very user interaction heavy tests.
- I think the code could be organized for better colocation, such as splitting the components folder into sub folders and locating the tests alongside them.

3. I think the most useful latest features in JS/TS include the likes of non destructive array functions such as toSorted. I've used this to memoize common data sorting or reversing to make it easier to go between the same data in different formats. Such as quickly seeing a reversed or sorted set of data. For TS it is not recent but more of a general concept but I like the type inference and how it continues to improve.

4. For tracking down performance issues in production there are a number of steps I would take:

- Reproduce the issue myself in production to verify the reproduction steps, taking note of things such as the data the issue realtes to, the area of the app, any noted user interactions that lead to the issue etc.
- If difficult to reproduce I would check things like logs in places such as Datadog or equivalent. I would look for things such as long requests or actions, long time to paint values etc.
- Reproduce the issue if possible preferably locally or in a dev or test environment
- If able to narrow down where the issue occurs, I would begin to look for possible issues. In the past I have seen improvements when looking at areas such as being able to run promises in parallel, using endpoints that return paged or subsets of data, moving requests to different areas of th eUI tree so they can run is isolation while the rest of the page renders etc.
- I have had to check for these issues before, mainly around displaying customer order information. This was an example where I used the above to see that one section of teh request was taking a long time. The ficx involved pinpointing the endpoint in question and talking with the backend team to identify a way to hand off loading the customers order information to it's own dedicated endpoint, whereas we were originally using a large endpoint that would return all customers for a given shop and time period along with their orders. Our UI was configured that you had to open a customer modal to get detailed information such as order history so we were able to hand that part off.
