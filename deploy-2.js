import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes();

const { repoId } = await freestyle.createGitRepository({
    name: "Test Repository",

    // This will make it easy for us to clone the repo during testing.
    // The repo won't be listed on any public registry, but anybody
    // with the uuid can clone it. You should disable this in production.
    public: true,

    source: {
        url: "https://github.com/shubhamshinde245/YC_Hack.git",
        type: "git",
    },
});

console.log(`Created repo with ID: ${repoId}`);

const devServer = await freestyle.requestDevServer({ repoId });

console.log(`Dev Server URL: ${devServer.ephemeralUrl}`);