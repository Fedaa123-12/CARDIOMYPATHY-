# cardiomyopathy-data-site

Manchester Metropolitan University | 2023 Software Engineering
Year 3 Advanced Web Development - Group Module
Group 4: Jamie Espitia Briers, Fedaa Chamat, Conrad Harman



## Update on the project

The original repositry has been deleted by one team member and could not be recovered.
This is a presentation of the original website and what it looke like.
For more information about the website, please visit:   https://fedaa-chamat.co.uk/cardiomyopathy.html.


## Project Overview

This project was presented as a client requested product to fill a
resource gap for people interested in cardiomyopathy - a term for
heart diseases affecting the muscles walls.

The client requested a website that would allow users to access
information about cardiomyopathy, as well as visualise data
held in databases about the diseases. There is not one main
center of data for cardiomyopathy and this site aims to begin
filling this gap.

People likely to use the service are clinicians, cardiologists
and medical professionals, as well as academic researchers
and people wanting to know more about the diseases.

To fit this brief, our project ustilises a local database of
heart analystics and gene mutations associated with
cardiomyopathies, as well as a wider collection of genetic
data from the HPO database of genetics.

## Usage

Users are able to access other websites focused on cardiomyopathy
awareness via links on the site homepage. The local database can
be queried, with returned data being placed into a table. The HPO
gene data is also placed into a table after users search a gene.

Tables are good at delivering lots of data in a small space, but
not good at providing a visual overview of the data. To solve
this, our site contains a graph analysis page where users can
enter the heart and gene data they want to visualise. Graphs are
generated dynamically, presenting the data in easy visual formats.

Beyond data retreival and visualisation, users may be interested
in expanding the datset. To do this, the site contains a form
where users can enter new data, or update data they have
previously inputted.

## Future Paths

This project aims to provide a centralisation of cardiomyopathy
data. Currently, the site is limited to a local database and the
HPO database. In the future, the site could be expanded to use
other medial API's and databases to provide a more comprehensive
repository of cardiomyopathy data. With the continued efforts of
our development team, and the help of other medical resources and
researchers,this site could become an essential resource for
medical analysis and education.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
