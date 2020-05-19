module.exports = {
    get realiboxToken() { return "https://open.realibox.com/api/dev/v2/auth/access_token" },
    get projects() { return "https://open.realibox.com/api/dev/v2/projects" },
    projectData: (id) => `https://open.realibox.com/api/dev/v2/projects/${id}/data`,
}