# Development Guidelines
Since I'm on the hook to maintain this app in the long term, I'd like to ask for some specific guidelines on how to structure and write code and manage dependencies. I realize these might not be things you would do if someone wanted you to develop something from scratch, I'm willing to pay the extra costs if it takes you more time to develop in this style. I'll keep any new guidelines in this page as we go. Let me know if you have any questions. 

## Directory Structure
----------------

I see this being three separate applications. The directories are laid out as follows:

* `src/admin-app`: The UI for administrators of the app, primarily me and my business partner
* `src/partier-app`: The UI for partiers
* `src/promoters-app`: The UI for promoters looking for partiers

Any code that will be shared among the apps (config, api client, etc.) is in the `src/` directory alongside these apps. 

Within each app, I'd like to try to match the directory structure with the apps route structure. Since React Router V4 allows you to nest routers, if a route has subroutes, the `index.tsx` will be a router which dispatches to a subroute (with the default view in the `default/` directory. 

For example
* `src/partier-app/profile/index.tsx` is a nested router that chooses between the edit view or the default view. 
* `src/partier-app/profile/edit/index.tsx` is what is shown at `/partier/profile/edit`
* `src/partier-app/profile/default/index.tsx` is what is shown at `/partier/profile`

## Managing State
----------------

I strongly prefer to keep `Redux` out of my code. I don't like the design of the library, the massive amount of boilerplate that it uses to wire up components, and I don't like how you have to keep a large global state container, as that makes things very confusing once you get past a few items in your global state.

I use Mobx for state management because you really only need to know `@observer` and `@observable` to get things working. I can also quite easily keep the model (data store) as local as possible to the component. Notice, for example, that the `Model.ts` with all of the state for the `/partier/profile` default route is only referenced from the `src/partier-app/profile/default/` directory. There is no reason for other routes to be exposed to this data store, so it stays as close to the component as possible.

I tend to use data stores in the way described by [this page in the mobx documents](https://mobx.js.org/best/store.html). In particular, I will build a "Model" that contains all the mobx observables for a view. 

If there are methods or api calls that need to be called in a specific view, it will be exposed as a method on the model. For example, a submit button may call a method on the model which submits the `async` POST request, `await`s the response, checks for errors, etc. 

