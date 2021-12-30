module.exports = ({github, context}) => {
  (async () => {
    // https://octokit.github.io/rest.js/v18#search-issues-and-pull-requests
    const pulls = await github.rest.search.issuesAndPullRequests({
      q: "is:open+is:pr+author:xuwei-k+archived:false",
      per_page: 100
    });
//    console.log(pulls);
    const conflicts = [];
    for (const pull of pulls.data.items) {
//      console.log(pull);
      console.log(pull.url);
      const pull_req = await github.request(`GET ${pull.pull_request.url}`)
//      console.log(pull_req.data);
      if (pull_req.data.mergeable === false) {
        console.log(pull_req.data.mergeable);
        conflicts.push(pull.html_url);
      }
    }
    return conflicts;
  })();
};
