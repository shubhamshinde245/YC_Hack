import { FreestyleSandboxes } from "freestyle-sandboxes";
import { prepareDirForDeploymentSync } from "freestyle-sandboxes/utils";

// Create a sandboxes client
const sandboxes = new FreestyleSandboxes({
    apiKey: "JXQQEvxH8TSuQqBoXCbjah-HbptNy9qQ4mqN6cnSVd3c8de7wn7HzEs1DEQXuX6ovA1",
});

async function deploy() {
    await sandboxes.deployWeb(prepareDirForDeploymentSync("."), {
        // put whatever domains you want here
        domains: ["test-2.style.dev"],
        build: true, // This automatically detects the framework and configures/builds for you
    });
}

deploy();