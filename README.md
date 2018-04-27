# What?

This repo contains the logo for [JSCraftCamp][jscc].
Find [the source on github][source] and feel free to send PRs
for any inspiration like a better animation or anything. We love to get helping hands.

The logo (since 2017) is built using [Bonsai, a SVG animation library][bonsai].

[jscc]: https://jscraftcamp.org
[source]: https://github.com/jscraftcamp/logo
[bonsai]: https://github.com/uxebu/bonsai

# Install/setup, via nix - for local development

The project can be built and run locally using nix, to reproduce the environment.
1) Make sure to have nix installed (see [nixos.org/nix][nix]) and then
1) `cd <project-dir>`
1) run `nix-shell` and you should have the environment up and running
1) install all node modules using `npm install`
1) prove that it works, `npm test`
1) now you have a shell with a deterministic environment (incl. node version)

[nix]: http://nixos.org/nix/