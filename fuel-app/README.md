
# Fuel Transformation

This is a [Next.js](https://nextjs.org/) project for the dotcom site migration.

## Local setup
- Run `npm install` to install all the dependencies (node_modules) needed.
*If you encounter any issues installing the node_modules, run `npm install -f`*
- After the successful installation of node_modules, run `npm run dev`, this should spin up the application on `http://localhost:3000/`
- Redirect to [`http://localhost:3000/pages`](http://localhost:3000/pages). This is the homepage of the application.

If you are using a page with recaptcha use `http://localhost.frontier.com:3000/pages`

Navigation:
To navigate to the `shop/tv` page the URL should be `http://localhost:3000/pages/shop/tv`.

**Note:**  `http://localhost:3000/pages` in the URL is the base path.

## Run the build version

To run the build version, follow the below steps
- Run `npm run build`. This command will generate a build folder to the local existing changes.
- Run `npm run start` to spin up the application over the build version on [`http://localhost:3000/pages`](http://localhost:3000/pages)

## Storybook
Storybook is an open source tool for building UI components and pages in isolation.
Run `npm run storybook` to run the storybook locally. This should open the storybook at [`http://localhost:6006/`](http://localhost:6006/)
**Note:**
1. Storybook should only be written for components present inside `src/blitz`
2. SVG's added into `src/blitz/assets/react-icons` will be automatically added to storybook (Don't forget to export the SVG icon from `src/blitz/assets/react-icons/index.tsx`).


## Files structure

**`src/__tests__`**
> This folder contains all the unit test cases for all the components present in the application code. To run all the test cases: `npm run test` To run a specific file test cases: `npm run <file_name>`
>
> ex: `npm run Services.test.tsx`
>
> Key notes:
> 1. Avoid looking for snapshots, instead find for the text or id.
> 2. Try using data-testid / data-tid for find the element.
> 3. Use only `@testing-library/react` for writing the test cases for any component.
> 4. Follow the exact folder path to create a new test files matching to the files location in src Example: To create a new test file for `/src/components/TestComponent.tsx` create a new file at location `/src/__tests__/components/TestComponent.test.tsx`

**`src/blitz`**
> This folder contains all the re-usable ui kit components that are used in this application. Each component in this blitz folder should contain the following files:
>
> - `Accordion.tsx` - The logic / component definition goes into this file
> - `Accordion.module.scss` - All the scss goes into this moduled scss file
> - `Accordion.module.scss.d.ts` - This is the definition file of the scss that are written in above scss file.
> - `Accordion.stories.tsx` - All the storybook stories are written here which are related to the components.
> - `index.tsx` - All the exports of the component is declared here
> - `types.tsx` - All the types that are used for this component are declared here
>
> There are certain global scss constants that are declared in `src/blitz/theme` which has `_colors.scss`, `_fonts.scss`, `_mixins.scss`& `index.scss`. To use these constants declared here add `@import '../../theme/index.scss'` on the top of the scss file.
>
>Note: Don't import any material ui related items. Create them from scratch.
> Before creating a component / icon, please look into the storybook ([`http://localhost:6006/`](http://localhost:6006/)) and create one if it is not present.

**`src/components`**
> This folder contains all the re-usable components.
> **Note:** Try adding the re-usable components in `src/blitz` and add stories to them so it can be viewed on storybook and it will have a greater chances for better reusability.

**`src/constants`**
> This folder contains all the constants used across the application

**`src/hooks`**
> This folder contains all the hooks that are used across the application
> Important hooks to remember:
> 1. `useAppData` to pull the fetch the select the data fetched from sitecore.
> Ex: useAppData("Header", true) -> Will return the data if present or will return {} if not present.
> 2. `useWindowDimensions` will return the height and width of the window.

**`src/layout`**
> MainLayout is responsible for rendering the Header, Footer and Alert banner across all the pages.

**`src/libs`**
> libs folder contains all the components which are not reusable and used it a page. The folder structures inside this libs folder will match to the url that page is rendering at.
Ex: `shop/tv` components which are not reusable will be placed at `src/libs/shop/tv` path.

**`src/pages`**
> This is kind of a routing folder. All the files declared here acts as a routes to different paths excluding `_app.tsx` and `_document.tsx`. There are next.js config wrappers around the pages.
> All the apis goes into `src/pages/api` which creates an endpoint on the same domain.
> Ex: `http://localhost:3000/pages/api/profile` will call the `src/pages/api/profile` file and returns the response. The code that is written in profile.tsx file here acts as a hosted REST endpoint which accepts REST calls and returns data.

**`src/redux`**
> This folder contains all the redux store logic.

**`src/utils`**
> This folder contains all the reusable logic that will be used across the app.

For any issues / questions, please reach out to Fuel transformation team.



# Process for image optimization:
All images should be exported as a JPG and in a way that optimizes the exported image. For example, Photoshop has an option "Export As" that has built in optimizations and custom options for compression. The compression ratio for JPG image files is high, so it is not recommended that PNG files are used.
Run all exported images through the TinyPNG compression algorithm. This will drastically reduce the file size of images while maintaining quality as it is lossless compression. You may also install their API in your project https://tinypng.com/developers/reference/nodejs
Generate WEBP image files. You can either add something like https://www.npmjs.com/package/webp-converter to your project or have creative generate webp images. Personally, I'd want to make sure they are properly generating, so I'd recommend installing an NPM package. The tradeoff is your build-time may increase.

# Serving CSS background Images as WEBP
The best way to handle this would be through a CMS or a service like Cloudinary, but, since we don't support that, using something like Modernizr will do the trick if you want to take that step. More info: https://css-tricks.com/using-webp-images/#h-using-webp-images-in-css
