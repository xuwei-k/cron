module.exports = ({github, context}) => {
  (async () => {
    // https://octokit.github.io/rest.js/v18#search-issues-and-pull-requests
    const pulls = await github.rest.search.issuesAndPullRequests({
      q: "is:open+is:pr+author:xuwei-k+archived:false",
      per_page: 100
    });
    console.log(pulls);
    for (const pull of pulls.data) {
      console.log(pull);
      const pull_req = await github.rest.pulls.get({
        owner: pull.repo.owner,
        repo: pull.repo.repo,
        pull_number: pull.number
      });
      if (pull_req.data.mergeable === false) {
        // TODO
      }
    }
  })();
};
